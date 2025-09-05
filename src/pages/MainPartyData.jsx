import { Link } from "react-router-dom";
import "../style/_mainPartyData.scss";

export default function MainPartyData() {
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
                        <tr>
                            <td colSpan="4" className="empty">
                                لا يوجد بيانات بالجدول
                            </td>
                        </tr>
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
