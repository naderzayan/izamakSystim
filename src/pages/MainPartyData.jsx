import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/_mainPartyData.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function MainPartyData() {
    const [parties, setParties] = useState([]);

    useEffect(() => {
        const storedParties = JSON.parse(localStorage.getItem("parties")) || [];
        setParties(storedParties);
    }, []);

    const handleDelete = (index) => {
        const updatedParties = parties.filter((_, i) => i !== index);
        setParties(updatedParties);
        localStorage.setItem("parties", JSON.stringify(updatedParties));
    };

    return (
        <main className="mainOfMainPartyData">
            <div className="addParty">
                <button className="addBtn">
                    <Link to="/createnewparty">+ إضافة حفل جديد</Link>
                </button>
                <div>
                    <img src="logo.svg" alt="" />
                </div>
                <div className="search">
                    <input type="search" placeholder="ادخل اسم الحفلة" />
                    <button className="searchBtn">بحث</button>
                </div>
            </div>

            <table className="partyTable">
                <thead>
                    <tr>
                        <th>اسم الحفلة</th>
                        <th>ميعاد الحفلة</th>
                        <th>عنوان الحفلة</th>
                        <th>تعديل وحذف</th>
                    </tr>
                </thead>
                <tbody>
                    {parties.length > 0 ? (
                        parties.map((party, index) => (
                            <tr key={index}>
                                <td>{party.name}</td>
                                <td>{party.date}</td>
                                <td>{party.place}</td>
                                <td>
                                    <button className="editBtn"><Link to='/AddInvitors'><BsDatabaseAdd /></Link></button>
                                    <button className="deleteBtn" onClick={() => handleDelete(index)}>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="empty">
                                لا يوجد بيانات بالجدول
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pages">
                <button className="prev">Next</button>
                <span>1</span>
                <button className="next">Prev</button>
            </div>
        </main>
    );
}
