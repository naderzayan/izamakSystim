import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/_mainPartyData.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function MainPartyData() {
    const [parties, setParties] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const baseUrl = "https://www.izemak.com/azimak/public/api/parties";

    const fetchParties = (page = 1) => {
        fetch(`${baseUrl}?page=${page}`, {
            headers: { Accept: "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                setParties(data.data);
                setLastPage(data.meta?.last_page || 1);
                console.log("response", data);
            })
            .catch((error) => console.error("Fetch error:", error));
    };

    useEffect(() => {
        fetchParties(currentPage);
    }, [currentPage]);

    const confirmDelete = (index) => {
        setDeleteIndex(index);
        setShowModal(true);
    };

    const handleDelete = () => {
        if (deleteIndex === null) return;
        const updatedParties = parties.filter((_, i) => i !== deleteIndex);
        setParties(updatedParties);
        setShowModal(false);
        setDeleteIndex(null);
    };

    const handleSearch = () => {
        setSearchPerformed(true);
        if (!searchTerm) {
            fetchParties(currentPage);
            return;
        }
        const result = parties.filter((party) => party.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setParties(result);
    };

    const goToNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
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
                        <th>اضافة مدعويين وحذف الحفلة</th>
                    </tr>
                </thead>
                <tbody>
                    {parties.length > 0 ? (
                        parties.map((party, index) => (
                            <tr key={index}>
                                <td>{party.name}</td>
                                <td>{party.time}</td>
                                <td>{party.address}</td>
                                <td>
                                    <button className="editBtn">
                                        <Link to="/AddInvitors" state={{ party }}>
                                            <BsDatabaseAdd />
                                        </Link>
                                    </button>
                                    <button className="deleteBtn" onClick={() => confirmDelete(index)}>
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
                    {currentPage} / {lastPage}
                </span>
                <button className="next" onClick={goToNextPage} disabled={currentPage === lastPage}>
                    التالية
                </button>
            </div>

            {showModal && (
                <div className="modalOverlay">
                    <div className="modal">
                        <h3>هل متأكد من الحذف؟</h3>
                        <div className="modalActions">
                            <button className="confirmBtn" onClick={handleDelete}>
                                نعم
                            </button>
                            <button className="cancelBtn" onClick={() => setShowModal(false)}>
                                لا
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
