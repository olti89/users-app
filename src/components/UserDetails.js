import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>
        Address: {user.address?.street}, {user.address?.city}
      </p>
      <button onClick={() => navigate("/")}>Kthehu</button>
    </div>
  );
}

export default UserDetails;
