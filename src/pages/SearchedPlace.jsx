import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
// import Spinner from "../components/Slider";

export default function SearchedPlace() {
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);
	const useQuery = () => {
		return new URLSearchParams(useLocation().search); // bu orqali shaxar nomini return qilamiz
	};
	let queryName = useQuery();  // == name=${search} shunga teng -> name=andijan 
	let search = queryName.get("name")
	if (search) {
		search = search.charAt(0).toUpperCase() + search.slice(1);
	}

	useEffect(() => {
		async function fetchListings() {
			try {
				// get reference
				const listingsRef = collection(db, "listings");
				// create the query
				const q = query(
					listingsRef,
					where("address", "==", search),
					orderBy("timestamp", "desc"),
					limit(4),
				);
				// execute the query
				const querySnap = await getDocs(q);
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				// console.log(querySnap);
				
				setListings(listings);
				console.log(listings);
			} catch (error) {
				console.log(error);
			}
			setLoading(false)
		}
		fetchListings();
	}, [search]);

	return (
		<div>
			{loading && (
				<Spinner />
			)}
			<div className="max-w-6xl mx-auto pt-4 ">
				{listings && listings.length > 0 ? (
					<div className="m-2 mb-6">
						<h2 className="px-3 text-2xl mt-6 font-semibold">
							Qidirilgan uylar
						</h2>
						<Link to="/offers">
							<p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"></p>
						</Link>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
							{listings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
								/>
							))}
						</ul>
					</div>
				) : (
					<p className="text-center text-3xl text-gray-400 w-[100%] shadow-slate-600">
						Iltimos boshqa manzilni kiritib ko'ring
					</p>
				)}
			</div>
		</div>
	);
}
