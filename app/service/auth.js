// service/auth.js
const API_URL = "https://011-backend.vercel.app";

// 1. ฟังก์ชัน Login (ของเดิมที่คุณมี)
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // API returns: { status: "ok", message: "...", data: { token, status, ... } }
      // OR my previous edit made it: { status: "ok", message: "...", ... }
      // Wait, looking at my backend edit:
      // res.status(200).json({ status: "ok", message: "...", data: { ... } })

      // So `data` variable here is the whole JSON response.
      // We want to return data.data which contains the user info.
      const userInfo = data.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", userInfo.token);
        localStorage.setItem("status", userInfo.status);
        localStorage.setItem("username", userInfo.username);
        // Remove old role key
        localStorage.removeItem("role");
      }
      return { ok: true, data: userInfo };
    } else {
      return { ok: false, message: data.message || "Login failed" };
    }
  } catch (error) {
    console.error("Login Error:", error);
    return { ok: false, message: "Cannot connect to server" };
  }
};

// ---------------------------------------------------------
// 2. ฟังก์ชัน Register (ที่ต้องเพิ่มเข้าไปตรงนี้)
// ---------------------------------------------------------
export const registerUser = async (userData) => {
  try {
    // userData คือ object ที่ส่งมาจากหน้า Register (เช่น { username, password, email, ... })
    const response = await fetch(`${API_URL}/register`, {
      // ⚠️ ตรวจสอบว่า Backend ใช้ path '/register' ใช่ไหม
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      // สมัครสำเร็จ
      return { ok: true, data };
    } else {
      // สมัครไม่สำเร็จ (เช่น ชื่อซ้ำ)
      return { ok: false, message: data.message || "Registration failed" };
    }
  } catch (error) {
    console.error("Register Error:", error);
    return { ok: false, message: "Cannot connect to server" };
  }
};
