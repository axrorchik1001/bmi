import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
	const [activeLink, setActiveLink] = useState("");
	const [pageState, setPageState] = useState("Sign in");
	// const navigate = useNavigate();
	const auth = getAuth();

	const location = useLocation();
	useEffect(() => {
		setActiveLink(location.pathname);
	}, [location]); //location qaysi page da turgan bolsa refresh berilsa osha page da qoladi yo birinchi bolib sahifaga kirilganda active link chiqadi

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setPageState("Profile");
			} else {
				setPageState("Sign In");
			}
		});
	}, [auth]);

	// const location = useLocation();

	// console.log(location.pathname);

	return (
		<div className="bg-white border-b shadow-sm sticky top-0 z-40 ">
			<header className="flex justify-between items-center max-w-6xl mx-auto ">
				<div>
					<Link to="/">
						<p className="text-2xl text-color cursor-pointer ">Turar Joy</p>
					</Link>
				</div>
				<div>
					<ul className="flex  space-x-10">
						<li>
							<Link
								to="/"
								className={`py-3 px-4 block ${
									activeLink === "/"
										? "text-black border-b-[3px] border-b-red-500 "
										: "text-gray-400 "
								}
                `}
								// onClick={() => {
								// 	handleClick("/");
								// }}
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/offers"
								className={`py-3 px-4 block  ${
									activeLink === "/offers"
										? "text-black border-b-[3px] border-b-red-500 "
										: "text-gray-400 "
								}`}
								// onClick={() => {
								// 	handleClick("/offers");
								// }}
							>
								Offers
							</Link>
						</li>
						<li>
							<Link
								to="/profile"
								className={`py-3 px-4 block  ${
									(activeLink === "/sign-in" || activeLink === "/profile")
										? "text-black border-b-[3px] border-b-red-500 "
										: "text-gray-400 "
								}`}
								// onClick={() => {
								// 	handleClick("/sign-in");
								// }}
							>
								{pageState}
							</Link>
						</li>
					</ul>
				</div>
			</header>
		</div>
	);
}

// -----------------------------------
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// export default function Header() {
// 	const [pageState, setPageState] = useState("Sign in");
// 	const location = useLocation();
// 	const navigate = useNavigate();

// 		const auth = getAuth();
// 		useEffect(() => {
// 			onAuthStateChanged(auth, (user) => {
// 				if (user) {
// 					setPageState("Profile");
// 				} else {
// 					setPageState("Sign in");
// 				}
// 			});
// 		}, [auth]);

// function pathMatchRoute(route) {
// 	if (route === location.pathname) {
// 		return true;
// 	}
// }
// 	const [activeLink, setActiveLink] = useState("");

// 	const handleClick = (path) => {
// 		setActiveLink(path);
// 	}
// 	const pathMatchRoute = (route) => {
// 		return location.pathname === route;
// 	}

// 	return (
// 		<div className="bg-white border-b shadow-sm sticky top-0 z-50">
// 			<header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
// 				<div>
// 					<img
// 						src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
// 						alt="logo"
// 						className="h-5 cursor-pointer"
// 						onClick={() => navigate("/")}
// 					/>
// 				</div>
// 				<div>
// 					<ul className="flex space-x-10">
// 						<li
// 							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
// 								pathMatchRoute("/") && "text-black border-b-red-500"
// 							}`}
// 							onClick={() =>
// 								(setActiveLink("/"),
// 								navigate("/"))
// 								}
// 						>
// 							Home
// 						</li>
// 						<li
// 							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
// 								pathMatchRoute("/offers") && "text-black border-b-red-500"
// 							}`}
// 							onClick={() => navigate("/offers")}
// 						>
// 							Offers
// 						</li>
// 						<li
// 							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
// 								(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
// 								"text-black border-b-red-500"
// 							}`}
// 							onClick={() => navigate("/profile")}
// 						>
// 							{pageState}
// 						</li>
// 					</ul>
// 				</div>
// 			</header>
// 		</div>
// 	);
// }
