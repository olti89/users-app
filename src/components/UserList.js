import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
 //shtimi lokal
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();

    if (!name || !email) {
      alert("Emri dhe emaili janë të detyrueshëm!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      company: { name: "(lokal)" },
      phone: "",
      website: "",
      address: { street: "", city: "" },
    };

    setUsers([newUser, ...users]);
    e.target.reset();
  };

  // bonusi
  const filtered = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let valA, valB;
      if (sortKey === "name") {
        valA = a.name;
        valB = b.name;
      } else if (sortKey === "email") {
        valA = a.email;
        valB = b.email;
      } else if (sortKey === "company") {
        valA = a.company?.name || "";
        valB = b.company?.name || "";
      }

      if (sortOrder === "asc") {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista e User-ave</h2>

      
      <form onSubmit={handleAddUser} style={{ marginBottom: "10px" }}>
        <input type="text" name="name" placeholder="Emri" />
        <input type="email" name="email" placeholder="Email" />
        <button type="submit">Shto User</button>
      </form>

      
      <input
        type="text"
        placeholder="Kërko me emër ose email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", display: "block" }}
      />


      <div style={{ marginBottom: "10px" }}>
        <label>Rendit sipas: </label>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="name">Emri</option>
          <option value="email">Email</option>
          <option value="company">Kompania</option>
        </select>
        <button
          type="button"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc" ? "▲ Asc" : "▼ Desc"}
        </button>
      </div>

    
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                Emri
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                Email
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                Kompania
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {user.email}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {user.company?.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
