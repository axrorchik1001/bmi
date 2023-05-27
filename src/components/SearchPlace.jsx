import React from "react";
import Img from "../img/background.jpg";

export default function SearchPlace() {
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
					<p className="text-white  mx-auto text-center font-semibold text-5xl">
						Yangi uyingizni kashf eting
					</p>
				</div>
				<div className="flex justify-center mt-10">
					<form className="w-[65%] sm:w-[50%]">
					<input
					type="text"
					id="name"
					// value={}
					// onChange={onChange}
					placeholder="Manzil bo'yicha qidiring..."
					maxLength="32"
					minLength="10"
					required
					className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
				/>
					</form>
				</div>
			</div>

		</div>
	);
}
