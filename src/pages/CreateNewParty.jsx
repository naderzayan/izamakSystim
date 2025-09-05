import React from "react";
import "../style/_createNewParty.scss";

export default function CreateNewParty() {
    return (
        <main className="mainOfCreateNewParty">
            <h1 className="title">إضافة حفل جديد</h1>

            <form className="formContainer">
                <div className="dataOfNewParty">
                    <select>
                        <option>ارسال الدعوة فقط</option>
                        <option>ارسال الدعوة مع السؤال</option>
                        <option>ارسال الدعوة ورمز الدخول مع السؤال</option>
                        <option>ارسال الدعوة مع رمز الدخول بدون سؤال</option>
                        <option>ارسال الموقع</option>
                        <option>ارسال رمز الدخول فقط</option>
                    </select>
                </div>

                <div className="dataOfNewParty">
                    <label>اسم الحفل</label>
                    <input type="text" placeholder="اسم الحفل" />
                </div>

                <div className="dataOfNewParty">
                    <label>ميعاد الحفل</label>
                    <input type="text" placeholder="ميعاد الحفل" />
                </div>

                <div className="dataOfNewParty">
                    <label>مكان الحفل</label>
                    <input type="text" placeholder="مكان الحفل" />
                </div>

                <div className="dataOfNewParty">
                    <label>ادخل نص الدعوة</label>
                    <textarea placeholder="ادخل نص الدعوة"></textarea>
                </div>

                <div className="dataOfNewParty">
                    <button type="submit" className="submitBtn">
                        إضافة الحفلة
                    </button>
                </div>
            </form>
        </main>
    );
}
