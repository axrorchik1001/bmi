import React, { useState } from "react";
import Img from "../img/background.jpg";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
// import { Link } from "react-router-dom";

export default function BgImg() {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (search == "") {
			return;
		} else {
			navigate(`/searched-place?name=${search}`);
			setSearch("");
		}
	};

	return (
		<div
			className="h-[600px] relative "
			style={{
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${Img})`,
				backgroundSize: "cover",
				marginTop: "-100px",
			}}
		>
			<div className="absolute top-[240px]  w-full">
				<div>
					<p className="text-white  mx-auto text-center font-semibold text-4xl sm:text-5xl">
						Yangi uyingizni kashf eting
					</p>
				</div>

				<div className="flex justify-center mt-10">
					<form
						onSubmit={handleSubmit}
						className="w-[80%] sm:w-[50%] flex relative"
					>
						<input
							type="text"
							id="name"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Manzil bo'yicha qidiring..."
							maxLength="32"
							required
							className="text-sm   sm:text-xl w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 search-input"
						/>
						{}
						<button
							onClick={handleSubmit}
							className="text-[#de9e7c] absolute right-0 bottom-4 md:bottom-auto  md:top-0  p-[11px]"
						>
							{window.innerWidth <= 640 ? (
								<SearchIcon
									className=" bg-[#F07E49] text-white rounded-full  "
									sx={{ fontSize: 32 }}
								/>
							) : (
								"Qidirish"
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
