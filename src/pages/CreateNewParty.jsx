import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/_createNewParty.scss";

export default function CreateNewParty() {
    const navigate = useNavigate();
    const [partyName, setPartyName] = useState("");
    const [partyDate, setPartyDate] = useState("");
    const [partyPlace, setPartyPlace] = useState("");
    const [invitation, setInvitation] = useState("");
    const [invitationText, setInvitationText] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newParty = {
            name: partyName,
            address: partyPlace,
            location: "",
            time: partyDate,
            invititon: null,
            partyInvitationText: invitationText,
            party_condition: invitation,
        };
        try {
            const response = await fetch("https://www.izemak.com/azimak/public/api/addparty", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newParty),
            });
            if (!response.ok) {
                throw new Error("Failed to save guest");                
            }
            navigate("/mainpartydata");
        } catch (error) {
            console.error("Error saving guest:", error);
        }
    };

    return (
        <main className="mainOfCreateNewParty">
            <h1 className="title">إضافة حفل جديد</h1>

            <form className="formContainer" onSubmit={handleSubmit}>
                <div className="dataOfNewParty">
                    <select name="" id="" value={invitation} onChange={(e) => setInvitation(e.target.value)}>
                        <option value="invitation">ارسال الدعوة فقط</option>
                        <option value="invitationWithQuestion">ارسال الدعوة مع السؤال</option>
                        <option value="both">ارسال الدعوة ورمز الدخول مع السؤال</option>
                        <option value="bothwithoutQuestion">ارسال الدعوة مع رمز الدخول بدون سؤال</option>
                        <option value="location">ارسال الموقع</option>
                        <option value="qr">ارسال رمز الدخول فقط</option>
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
                    <input type="text" placeholder="ادخل نص الدعوة" value={invitationText} onChange={(e) => setInvitationText(e.target.value)} />
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
