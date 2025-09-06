import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/_login.scss";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const correctUsername = "izemak";
        const correctPassword = "12345678";
        const correctEmail = "izemal2024@gmail.com";

        if (username === correctUsername && password === correctPassword && email === correctEmail) {
            navigate("/mainpartydata");
        } else {
            setError("بيانات تسجيل الدخول غير صحيحة!");
        }
    };

    return (
        <main className="mainOfLogin">
            <form className="loginBox" onSubmit={handleSubmit}>
                <img src="logo.svg" alt="Logo" className="logo" />

                <div className="input">
                    <input type="text" placeholder="اسم المستخدم" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input">
                    <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input">
                    <input type="email" placeholder="ادخل الايميل" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit" className="loginBtn">
                    تسجيل الدخول
                </button>
            </form>
        </main>
    );
}
