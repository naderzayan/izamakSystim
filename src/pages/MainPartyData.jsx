import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/_mainPartyData.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function MainPartyData() {
    const [parties, setParties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const storedParties = JSON.parse(localStorage.getItem("parties")) || [];
        setParties(storedParties);
    }, []);

    const handleDelete = (index) => {
        const updatedParties = parties.filter((_, i) => i !== index);
        setParties(updatedParties);
        localStorage.setItem("parties", JSON.stringify(updatedParties));
    };

    // حساب عدد الصفحات
    const totalPages = Math.ceil(parties.length / itemsPerPage);

    // تحديد بداية ونهاية البيانات في الصفحة الحالية
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentParties = parties.slice(startIndex, endIndex);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
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
                    {currentParties.length > 0 ? (
                        currentParties.map((party, index) => (
                            <tr key={startIndex + index}>
                                <td>{party.name}</td>
                                <td>{party.date}</td>
                                <td>{party.place}</td>
                                <td>
                                    <button className="editBtn">
                                        <Link to="/AddInvitors">
                                            <BsDatabaseAdd />
                                        </Link>
                                    </button>
                                    <button className="deleteBtn" onClick={() => handleDelete(startIndex + index)}>
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
                <button className="prev" onClick={goToPrevPage} disabled={currentPage === 1}>
                    السابقة
                </button>
                <span>
                    {currentPage} / {totalPages || 1}
                </span>
                <button className="next" onClick={goToNextPage} disabled={currentPage === totalPages || totalPages === 0}>
                    التالية
                </button>
            </div>
        </main>
    );
}
