import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/_createNewParty.scss";

export default function CreateNewParty() {
    const navigate = useNavigate();
    const [partyName, setPartyName] = useState("");
    const [partyDate, setPartyDate] = useState("");
    const [partyPlace, setPartyPlace] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newParty = {
            name: partyName,
            date: partyDate,
            place: partyPlace,
        };

        const existingParties = JSON.parse(localStorage.getItem("parties")) || [];
        existingParties.push(newParty);

        localStorage.setItem("parties", JSON.stringify(existingParties));

        navigate("/mainpartydata");
    };

    return (
        <main className="mainOfCreateNewParty">
            <h1 className="title">إضافة حفل جديد</h1>

            <form className="formContainer" onSubmit={handleSubmit}>
                <div className="dataOfNewParty">
                    <select name="" id="">
                        <option value="">ارسال الدعوة فقط</option>
                        <option value="">ارسال الدعوة مع السؤال</option>
                        <option value="">ارسال الدعوة ورمز الدخول مع السؤال</option>
                        <option value="">ارسال الدعوة مع رمز الدخول بدون سؤال</option>
                        <option value="">ارسال الموقع</option>
                        <option value="">ارسال رمز الدخول فقط</option>
                    </select>
                </div>
                <div className="dataOfNewParty">
                    <label>اسم الحفل</label>
                    <input type="text" placeholder="اسم الحفل" value={partyName} onChange={(e) => setPartyName(e.target.value)} required />
                </div>

                <div className="dataOfNewParty">
                    <label>ميعاد الحفل</label>
                    <input type="text" placeholder="ميعاد الحفل" value={partyDate} onChange={(e) => setPartyDate(e.target.value)} required />
                </div>

                <div className="dataOfNewParty">
                    <label>مكان الحفل</label>
                    <input type="text" placeholder="مكان الحفل" value={partyPlace} onChange={(e) => setPartyPlace(e.target.value)} required />
                </div>
                <div className="dataOfNewParty">
                    <label>ادخل نص الدعوة</label>
                    <input type="text" placeholder="ادخل نص الدعوة" />
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
