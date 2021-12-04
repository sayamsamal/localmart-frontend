import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Admin or User?</h1>
      <div className="mt-3">
        <Link to="admin" className="btn btn-primary w-50">
          Admin
        </Link>
      </div>
      <div className="mt-3">
        <Link to="user" className="btn btn-primary w-50">
          User
        </Link>
      </div>
      <br />
    </div>
  );
}
