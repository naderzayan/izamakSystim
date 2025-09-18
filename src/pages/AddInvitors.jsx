import React, { useState, useEffect, useMemo } from "react";
import "../style/_addInvitors.scss";
import { useLocation } from "react-router-dom";

export default function AddInvitors() {
    const location = useLocation();
    // const navigate = useNavigate();
    const [guests, setGuests] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [invites, setInvites] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const currentParty = location.state?.party;
    const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const partyId = currentParty?.id ?? query.get("partyId");

    useEffect(() => {
        if (!partyId) return;

        let cancelled = false;
        const fetchGuests = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://www.izemak.com/azimak/public/api/inviters/${partyId}`);
                if (!res.ok) throw new Error("No Data Added");
                const data = await res.json();
                const arr = Array.isArray(data) ? data : data?.data ?? data?.invitors ?? data?.members ?? [];
                if (!cancelled) setGuests(arr);
                console.log("Fetched guests:", arr);
            } catch (err) {
                if (!cancelled) setError(err.message || "error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchGuests();
        return () => {
            cancelled = true;
        };
    }, [partyId]);

    const handleAddGuest = async () => {
        if (!partyId) {
            alert("error ?partyId=ID");
            return;
        }
        if (!name || !phone || !invites) return;

        setSaving(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("Party_id", partyId);
            formData.append("name", name);
            formData.append("phoneNumber", phone);
            formData.append("maxScan", invites);

            const res = await fetch("https://www.izemak.com/azimak/public/api/addinvitor", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("error not added");
            const data = await res.json();
            const created = Array.isArray(data) ? data[0] : data?.data ?? data;
            setGuests((prev) => [...prev, created]);
            setName("");
            setPhone("");
            setInvites("");
        } catch (err) {
            setError(err.message || "error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="mainOfAddInvitors">
            <div className="sideBar">
                <h1>قائمة المدعوين</h1>
                {loading ? <p>Loading...</p> : null}
                <ul>
                    {!Array.isArray(guests) || guests.length === 0 ? (
                        <p>No Data Yet</p>
                    ) : (
                        guests.map((guest, idx) => (
                            <li key={guest.id ?? idx}>
                                <span>{guest.name}</span>
                                <span>{guest.status ?? ""}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="addDetailis">
                {error && <p className="error">{error}</p>}
                <h2>أدخل بيانات المدعو</h2>

                <div className="name">
                    <label>الاسم</label>
                    <input type="text" placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="phoneNum">
                    <label>رقم الهاتف</label>
                    <input type="text" placeholder="رقم الهاتف" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="numOfInvitations">
                    <label>عدد الدعوات</label>
                    <input type="number" placeholder="عدد الدعوات" value={invites} onChange={(e) => setInvites(e.target.value)} />
                </div>

                <div className="buttons">
                    <div className="addButton">
                        <button type="button" onClick={handleAddGuest} disabled={saving}>
                            {saving ? "Loading..." : "إضافة"}
                        </button>
                    </div>
                    <div className="addButton">
                        <input type="file" name="" id="" className="inputUpload"/>
                    </div>
                </div>
            </div>
        </main>
    );
}
