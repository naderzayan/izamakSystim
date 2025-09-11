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
    const [showModal, setShowModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch("https://www.izemak.com/azimak/public/api/parties")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                return response.json();
            })
            .then((data) => {
                setParties(data.data);
                console.log("response", data.data);

                setFilteredParties(data.data);
            })
            .catch((error) => console.error("Fetch error:", error));
    }, []);

 

    const confirmDelete = (index) => {
        setDeleteIndex(index);
        setShowModal(true);
    };

    const handleDelete = () => {
        if (deleteIndex === null) return;

        const updatedParties = parties.filter((_, i) => i !== deleteIndex);
        setParties(updatedParties);

        const updatedFiltered = filteredParties.filter((_, i) => i !== deleteIndex);
        setFilteredParties(updatedFiltered);

        localStorage.setItem("parties", JSON.stringify(updatedParties));
        setShowModal(false);
        setDeleteIndex(null);
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
                        <th>الرقم</th>
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
                                <td>{party.id}</td>
                                <td>{party.name}</td>
                                <td>{party.time}</td>
                                <td>{party.address}</td>
                                <td>
                                    <button className="editBtn">
                                        <Link to="/AddInvitors" state={{ party: currentParties[index] }}>
                                            <BsDatabaseAdd />
                                        </Link>
                                    </button>
                                    <button className="deleteBtn" onClick={() => confirmDelete(startIndex + index)}>
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
