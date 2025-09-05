import React from "react";
import "../style/_login.scss";

export default function Login() {
    return (
        <main className="mainOfLogin">
            <form className="loginBox">
                <img src="logo.svg" alt="Logo" className="logo" />

                <div className="input">
                    <input type="text" placeholder="اسم المستخدم" required/>
                </div>
                <div className="input">
                    <input type="password" placeholder="كلمة المرور" required/>
                </div>
                <div className="input">
                    <input type="email" placeholder="ادخل الايميل" required/>
                </div>

                <button type="submit" className="loginBtn">
                    تسجيل الدخول
                </button>
            </form>
        </main>
    );
}
