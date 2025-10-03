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

