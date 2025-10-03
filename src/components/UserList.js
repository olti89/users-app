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

      
