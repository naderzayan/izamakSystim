// // import React, { useEffect, useState } from "react";

// // function ExampleComponent() {
// //     const [data, setData] = useState(null);

// //     useEffect(() => {
// //         fetch("https://www.izemak.com/azimak/public/api/parties")
// //             .then((response) => {
// //                 if (!response.ok) {
// //                     throw new Error("Network response was not ok");
// //                 }
// //                 console.log(response);
// //                 return response.json();
// //             })
// //             .then((data) => setData(data))
// //             .catch((error) => console.error("Fetch error:", error));
// //     }, []);

// //     return (
// //         <div>
// //             <h1>Data from API:</h1>
// //             <pre>{JSON.stringify(data, null, 2)}</pre>
// //         </div>
// //     );
// // }

// // export default ExampleComponent;


// const handleAddGuest = async () => {
//     if (!name || !phone || !invites) return;

//     const newGuest = {
//         name,
//         phone,
//         invites,
//         status: "invited",
//     };

//     try {
//         const response = await fetch("https://your-api-url.com/guests", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newGuest),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to save guest");
//         }

//         const savedGuest = await response.json();

//         // Optionally update UI immediately
//         const updatedGuests = [...guests, savedGuest];
//         setGuests(updatedGuests);

//         // Clear form
//         setName("");
//         setPhone("");
//         setInvites("");
//     } catch (error) {
//         console.error("Error saving guest:", error);
//     }
// };
