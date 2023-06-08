import { collection, getDocs } from "firebase/firestore";
import ListingItem from "./ListingItem";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export  const SearchedNavbar = ({inputValue}) => {

		const [listingsNavbar, setListingsNavbar] = useState([]) 
		// for min price1
		useEffect(() => {
			async function fetchMinPrice() {
				try {
					const listingsRef = collection(db, "listings");
					const querySnapshot = await getDocs(listingsRef);
	
					const filteredListings = [];
					querySnapshot.forEach((doc) => {
						const listing = doc.data();
						const regularPrice = listing.regularPrice;
						
						// Kiritilgan sonning kichikligini tekshiramiz
						if (parseInt(inputValue) <= regularPrice) {
							filteredListings.push(listing);
						}
						console.log(listing);
						// setListingsNavbar(filteredListings);
						// console.log(filteredListings);
						setListingsNavbar(filteredListings);
						// console.log(listingsNavbar);
					
					});
				} catch (error) {
					console.log(error);
				}
			}
	
			fetchMinPrice();
		}, [inputValue ]);
	
	
	return (
		<div className="max-w-6xl mx-auto overlay ">
			{listingsNavbar && listingsNavbar.length > 0  ? (
				<div className="m-2 ">
					<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
						{listingsNavbar.map((listing) => (
							listing.data && (
								<ListingItem
								key={listing.id}
								listing={listing.data}
								id={listing.id}
							/>
							)
						))}
					</ul>
				</div>
			) : (
				<p>Uzur xatolik</p>
			)}
		</div>
	);
};
