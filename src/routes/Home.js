import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="admin">Admin</Link>
      <Link to="user">User</Link>
    </div>
  );
}
