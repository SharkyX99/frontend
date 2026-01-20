"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const API_URL = "https://011-backend.vercel.app";

export default function UserManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!t) {
      router.push("/login");
      return;
    }
    setToken(t);

    async function getUsers() {
      try {
        setError(null);
        const res = await fetch(`${API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        });
        if (!res.ok)
          throw new Error(
            `Failed to fetch data: ${res.status} ${res.statusText}`,
          );
        const data = await res.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    }

    getUsers();

  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  const handleDelete = async (id, name) => {
    try {
      const result = await Swal.fire({
        title: "ยืนยันการลบ",
        html: `คุณแน่ใจหรือไม่ที่จะลบผู้ใช้<br><strong class="text-danger">${name}</strong>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: '<i class="fas fa-trash me-1"></i> ลบ',
        cancelButtonText: '<i class="fas fa-times me-1"></i> ยกเลิก',
        reverseButtons: true,
        focusCancel: true,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary",
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed) {
        setDeleting(id);
        const response = await fetch(`${API_URL}/api/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setItems((prev) => prev.filter((item) => item.id !== id));
          await Swal.fire({
            icon: "success",
            title: "ลบสำเร็จ!",
            text: `ลบข้อมูล ${name} เรียบร้อยแล้ว`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        } else throw new Error(data.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err.message || "ไม่สามารถลบข้อมูลได้",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setDeleting(null);
    }
  };

  if (loading)
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          ></div>
          <h5 className="text-muted">Loading users...</h5>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
          <h4>Error Loading Data</h4>
          <p>{error}</p>
          <button
            className="btn btn-outline-danger"
            onClick={() => window.location.reload()}
          >
            <i className="fas fa-sync-alt me-1"></i> Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div
      className="min-vh-100"
      style={{ backgroundColor: "#f8f9fa", paddingTop: "20px" }}
    >
      {/* SignOut Button */}
      {token && (
        <div className="container text-end mb-3">
          <button className="btn btn-outline-danger" onClick={handleSignOut}>
            <i className="bi bi-box-arrow-right"></i> SignOut
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-primary text-white py-4 mb-4">
        <div className="container">
          <h1 className="mb-1">
            <i className="fas fa-users me-3"></i>User Management
          </h1>
          <p className="mb-0 opacity-75">Manage your system users</p>
        </div>
      </div>

      {/* Users Table & Stats */}
      <div className="container mt-50">
        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <div className="text-primary mb-2">
                  <i className="fas fa-users fa-2x"></i>
                </div>
                <h3 className="fw-bold mb-1">{items.length}</h3>
                <p className="text-muted mb-0">Total Users</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <div className="text-success mb-2">
                  <i className="fas fa-user-check fa-2x"></i>
                </div>
                <h3 className="fw-bold mb-1">
                  {items.filter((i) => i.status === "active").length ||
                    items.length}
                </h3>
                <p className="text-muted mb-0">Active Users</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <div className="text-info mb-2">
                  <i className="fas fa-clock fa-2x"></i>
                </div>
                <p className="text-muted mb-0">Auto Refresh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h5 className="mb-0 fw-bold">
              <i className="fas fa-list me-2 text-primary"></i>Users List
            </h5>
          </div>
          <div className="card-body p-0">
            {items.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-users fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">No users found</h5>
                <p className="text-muted">No users available in the system</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="text-center">#</th>
                      <th>First Name</th>
                      <th>Full Name</th>
                      <th>Last Name</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="text-center">{item.id}</td>
                        <td>{item.firstname || "-"}</td>
                        <td>{item.fullname || "-"}</td>
                        <td>{item.lastname || "-"}</td>
                        <td className="text-center">
                          <div className="btn-group">
                            <Link
                              href={`/admin/users/edit/${item.id}`}
                              className="btn btn-outline-warning btn-sm"
                            >
                              <i className="fas fa-edit"></i> Edit
                            </Link>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() =>
                                handleDelete(
                                  item.id,
                                  item.firstname || item.fullname,
                                )
                              }
                              disabled={deleting === item.id}
                            >
                              {deleting === item.id ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : (
                                <i className="fas fa-trash"></i>
                              )}{" "}
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="card-footer bg-light py-3">
              <div className="d-flex justify-content-between">
                <small className="text-muted">
                  Showing {items.length} user{items.length !== 1 ? "s" : ""}
                </small>
                <small className="text-muted">
                  Last updated: {new Date().toLocaleTimeString("th-TH")}
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
