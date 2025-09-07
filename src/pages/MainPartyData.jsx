import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/_mainPartyData.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function MainPartyData() {
    const [parties, setParties] = useState([]);
    const [filteredParties, setFilteredParties] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const storedParties = JSON.parse(localStorage.getItem("parties")) || [];
        setParties(storedParties);
        setFilteredParties(storedParties);
    }, []);

    const handleDelete = (index) => {
        const updatedParties = parties.filter((_, i) => i !== index);
        setParties(updatedParties);
        setFilteredParties(updatedParties);
        localStorage.setItem("parties", JSON.stringify(updatedParties));
    };

    const handleSearch = () => {
        setSearchPerformed(true);
        const result = parties.filter((party) => party.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredParties(result);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredParties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentParties = filteredParties.slice(startIndex, endIndex);

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
                    <input type="search" placeholder="ادخل اسم الحفلة" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className="searchBtn" onClick={handleSearch}>
                        بحث
                    </button>
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
                    ) : searchPerformed ? (
                        <tr>
                            <td colSpan="4" className="empty">
                                لا توجد نتائج مطابقة
                            </td>
                        </tr>
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
