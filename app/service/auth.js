// service/auth.js
const API_URL = 'https://011-backend.vercel.app'; // ⚠️ อย่าลืมแก้ Port ให้ตรงกับ Backend ของคุณ

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, { // Endpoint ต้องตรงกับ Backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // ✅ ล็อกอินผ่าน: บันทึก Token ลง LocalStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role); // ถ้ามี role ส่งมาด้วย
                localStorage.setItem('username', username);
            }
            return { ok: true, data };
        } else {
            // ❌ ล็อกอินไม่ผ่าน
            return { ok: false, message: data.message || 'Login failed' };
        }
    } catch (error) {
        console.error('Login Error:', error);
        return { ok: false, message: 'Cannot connect to server' };
    }
};