export default function Register() {
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Create an Account</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter username" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password" />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" placeholder="Re-enter password" />
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>

      <div className="text-center mt-3">
        <small>
          Already have an account? <a href="/login">Login here</a>
        </small>
      </div>
    </div>
  );
}
