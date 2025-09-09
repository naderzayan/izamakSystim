import React, { useState, useEffect } from "react";
import "../style/_addInvitors.scss";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";

export default function AddInvitors() {
    const [guests, setGuests] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [invites, setInvites] = useState("");

    useEffect(() => {
        const storedGuests = JSON.parse(localStorage.getItem("guests")) || [];
        setGuests(storedGuests);
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

    // حذف مدعو واحد
    // const handleDeleteGuest = (id) => {
    //     const updatedGuests = guests.filter((guest) => guest.id !== id);
    //     setGuests(updatedGuests);
    //     localStorage.setItem("guests", JSON.stringify(updatedGuests));
    // };

    // مسح كل المدعوين
    // const handleClearAll = () => {
    //     setGuests([]);
    //     localStorage.removeItem("guests");
    // };

    return (
        <main className="mainOfAddInvitors">
            <div className="sideBar">
                <h1>قائمة المدعوين</h1>
                {/* {guests.length > 0 && (
                    <button className="clearAllBtn" onClick={handleClearAll}>
                        مسح الكل <TiDeleteOutline />
                    </button>
                )} */}
                <ul>
                    {guests.length === 0 ? (
                        <p>لا يوجد مدعوون بعد</p>
                    ) : (
                        guests.map((guest) => (
                            <li key={guest.id}>
                                <span>
                                   - {guest.name}  
                                </span>
                                <span>
                                    {guest.status}
                                </span>
                                {/* <button className="deleteBtn" onClick={() => handleDeleteGuest(guest.id)}>
                                    <MdDeleteForever />
                                </button> */}
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
