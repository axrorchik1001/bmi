import React, { useEffect, useRef, useState } from "react";
// import { createContext } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useNavigate } from "react-router";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

// export const { ListingContext } = createContext();

export default function SearchNavbar({ inputValue, onInputChange }) {
	const [search, setSearch] = useState("");
	const [showModalPrice, setShowModalPrice] = useState(false);
	const [showModalBed, setShowModalBed] = useState(false);
	const [showModalType, setShowModalType] = useState(false);
	const [isLeaseChecked, setIsLeaseChecked] = useState(false);
	const [isSaleChecked, setIsSaleChecked] = useState(false);
	// const [minPrice, setMinPrice] = useState("");
	// const [maxPrice, setMaxPrice] = useState("");
	// const [listingsNavbar, setListingsNavbar] = useState("");

	const firstInputRef = useRef(null);
	const secondInputRef = useRef(null);
	const navigate = useNavigate();

	// const [value, setValue] = useState("")

	// const valuePrice = (e) => {
	// 	setValue(e.target.value);
	// 	getMinPrice(value)
		
	// 	console.log(value);
		
	// }

	const handleLeaseCheckboxChange = () => {
		setIsLeaseChecked(!isLeaseChecked);
		setIsSaleChecked(false);
	};

	const handleSaleCheckboxChange = () => {
		setIsLeaseChecked(false);
		setIsSaleChecked(!isSaleChecked);
	};

	const onPrice = (e) => {
		setShowModalPrice(!showModalPrice);
		setShowModalBed(false);
		setShowModalType(false);
	};
	const onBed = () => {
		setShowModalBed(!showModalBed);
		setShowModalPrice(false);
		setShowModalType(false);
	};
	const onType = (e) => {
		setShowModalType(!showModalType);
		setShowModalBed(false);
		setShowModalPrice(false);
	};
	const onMinMax = (e) => {
		e.preventDefault();

		// Birinchi inputdan qiymatni olish
		const firstInputValue = firstInputRef.current.value;

		// Ikkinchi inputga focus qilish
		secondInputRef.current.focus();
	};
	const OnMaxPrice = () => {
		console.log("salom");
	};

	const handleChange = (value) => {
		setSearch(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (search === "") {
			return;
		} else {
			navigate(`/searched-place?name=${search}`);
			setSearch("");
		}
	};
	const handleFirstInputKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();

			// console.log(minPrice);
		}
	};
	const handleSecondInputKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	};


	// for max price
	// useEffect(() => {
	// 	async function fetchMaxPrice() {
	// 		try {
	// 			const listingsRef = collection(db, "listings");
	// 			const querySnapshot = await getDocs(listingsRef);

	// 			const filteredListings = [];
	// 			querySnapshot.forEach((doc) => {
	// 				const listing = doc.data();
	// 				const regularPrice = listing.regularPrice;

	// 				// Kiritilgan min va max sonlarni tekshiramiz
	// 				if (
	// 					parseInt(minPrice) <= regularPrice &&
	// 					regularPrice <= parseInt(maxPrice)
	// 				) {
	// 					filteredListings.push(listing);
	// 				}
	// 				setListingsNavbar(filteredListings);
	// 			});
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}

	// 	fetchMaxPrice();
	// }, [minPrice, maxPrice]);

	return (
		// <ListingContext.Provider value={listingsNavbar}>
			<div className="h-[60px] sticky flex  bg-[#F4F4F4] items-center z-[1000]">	
				<span className="p-2 mr-32  w-[100px]  ">
					<div className="">
						<form
							onSubmit={handleSubmit}
							className="w-[80%] sm:w-[50%] flex relative"
						>
							<input
								type="text"
								id="name"
								value={search}
								onChange={(e) => handleChange(e.target.value)}
								placeholder="Manzil ..."
								maxLength="32"
								required
								// className="text-sm   sm:text-xl w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-2 search-input"
								className="p-[9px] border  border-gray-400 rounded-sm focus:outline-none focus:ring-0  "
							/>
						</form>
					</div>
				</span>

				<span className="p-2 mr-3 ml-4 w-[100px] rounded-sm ">
					<div
						onClick={onPrice}
						className="hover:bg-[#F07E49] hover:text-white bg-white border border-gray-400 rounded-sm"
					>
						<a href="#" className="flex items-center p-[9px] ">
							<span className="mr-1 ">Narxi</span>
							<span>
								<AiOutlineDown />
							</span>
						</a>
					</div>
				</span>

				<span className="p-2 mr-3  w-[100px] rounded-sm ">
					<div
						onClick={onBed}
						className="hover:bg-[#F07E49] hover:text-white bg-white border border-gray-400 rounded-sm"
					>
						<a href="#" className="flex items-center p-[9px]">
							<span className="mr-1">Yotoq</span>
							<span>
								<AiOutlineDown />
							</span>
						</a>
					</div>
				</span>
				<span className="p-2 mr-3  w-[100px] rounded-sm ">
					<div
						onClick={onType}
						className="hover:bg-[#F07E49] hover:text-white bg-white border border-gray-400 rounded-sm"
					>
						<a href="#" className="flex items-center p-[9px]">
							<span className="mr-1">Turi</span>
							<span>
								<AiOutlineDown />
							</span>
						</a>
					</div>
				</span>

				{showModalPrice && (
					<div className=" bg-yellow-600 z-[1000]">
						<div className="relative">
							<div className="w-[300px]  bg-[#f07e49] absolute top-[31px] right-[140px]">
								<form
									onSubmit={onMinMax}
									className="flex justify-between p-2 items-center"
								>
									<fieldset>
										<label>
											<input
												type="text"
												className="w-28"
												placeholder="Min $"
												ref={firstInputRef}
												onKeyDown={handleFirstInputKeyDown}
												// onChange={(e) => valuePrice(e)}
												// value={value}
												value={inputValue} onChange={onInputChange}
											/>
										</label>
									</fieldset>
									<i className="text-white">
										<AiOutlineMinus />
									</i>
									<fieldset>
										<label>
											<input
												type="text"
												className="w-28"
												placeholder="Max $"
												ref={secondInputRef}
												onKeyDown={handleSecondInputKeyDown}
												// onChange={(e) => setMaxPrice(e.target.value)}
												// value={maxPrice}
											/>
										</label>
									</fieldset>
								</form>
								<button type="submit" style={{ display: "none" }}></button>
							</div>
						</div>
					</div>
				)}

				{showModalBed && (
					<div className=" bg-yellow-600 z-[1000]">
						<div className="relative">
							<div className="w-[300px]  bg-[#f07e49] absolute top-[31px] right-[25px]">
								<div className="flex justify-between p-2 items-center">
									<fieldset>
										<label>
											<input type="text" className="w-28" placeholder="Min " />
										</label>
									</fieldset>
									<i className="text-white">
										<AiOutlineMinus />
									</i>
									<fieldset>
										<label>
											<input type="text" className="w-28" placeholder="Max " />
										</label>
									</fieldset>
								</div>
							</div>
						</div>
					</div>
				)}

				{showModalType && (
					<div className=" bg-yellow-600 z-[1000]">
						<div className="relative">
							<div className="w-[200px] h-[58px]  bg-[#f07e49] absolute top-[31px] right-[25px] flex items-center justify-evenly">
								<div className="flex justify-between p-1 items-center">
									<fieldset>
										<input
											type="checkbox"
											className="w-4"
											checked={isLeaseChecked}
											onChange={handleLeaseCheckboxChange}
										/>
										<label className="text-white ml-1">Ijara</label>
									</fieldset>
									<i className="text-white ml-2 mr-2">
										<AiOutlineMinus />
									</i>
									<fieldset>
										<input
											type="checkbox"
											className="w-4"
											checked={isSaleChecked}
											onChange={handleSaleCheckboxChange}
										/>
										<label className="text-white ml-1">Sotish</label>
									</fieldset>
								</div>
							</div>
						</div>
					</div>
				)}
				{/* <SearchedPlace minPrice={minPrice} maxPrice={maxPrice}/> */}
			</div>

		/* </ListingContext.Provider> */
	);
}
