import React, { useState, useEffect } from "react";
import "../style/_addInvitors.scss";
import { useLocation } from "react-router-dom";
export default function AddInvitors() {
    const [guests, setGuests] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [invites, setInvites] = useState("");
const location = useLocation();
const currentParty = location.state?.party;
    useEffect(() => {        
        setGuests(currentParty.members)
    }, []);

    const handleAddGuest = () => {
        if (!name || !phone || !invites) return;

        const newGuest = {
            id: Date.now(),
            name,
            phone,
            invites,
            status: "invited",
        };

        const updatedGuests = [...guests, newGuest];
        setGuests(updatedGuests);
        localStorage.setItem("guests", JSON.stringify(updatedGuests));

        setName("");
        setPhone("");
        setInvites("");
    };

    return (
        <main className="mainOfAddInvitors">
            <div className="sideBar">
                <h1>قائمة المدعوين</h1>
                <ul>
                    {guests.length === 0 ? (
                        <p>لا يوجد مدعوون بعد</p>
                    ) : (
                        guests.map((guest) => (
                            <li key={guest.id}>
                                <span>
                                    {guest.name}  
                                </span>
                                <span>
                                    {guest.status}
                                </span>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="addDetailis">
                <h2>أدخل بيانات المدعو</h2>

                <div className="name">
                    <label>الاسم</label>
                    <input type="text" placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="phoneNum">
                    <label>رقم الهاتف</label>
                    <input type="number" placeholder="رقم الهاتف" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="numOfInvitations">
                    <label>عدد الدعوات</label>
                    <input type="number" placeholder="عدد الدعوات" value={invites} onChange={(e) => setInvites(e.target.value)} />
                </div>

                <div className="addButton">
                    <button onClick={handleAddGuest}>إضافة</button>
                </div>
            </div>
        </main>
    );
}
