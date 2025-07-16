export default function LoginPage() {
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Login to Your Account</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password" />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      <div className="text-center mt-3">
        <small>
          Don't have an account? <a href="/register">Register here</a>
        </small>
      </div>
    </div>
  );
}
