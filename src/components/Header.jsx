import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function Header() {
	const [activeLink, setActiveLink] = useState("");
	const [pageState, setPageState] = useState("Sign in");
	const auth = getAuth();
	const location = useLocation();
	let [open, setOpen] = useState(false);

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

	return (
		<div className="bg-white border-b shadow-sm sticky top-0 z-40  ">
			<header className="flex justify-between items-center max-w-6xl mx-auto md:h-auto h-[45px] ">
				<div>
					<Link to="/">
						<p className="text-2xl text-color cursor-pointer ml-3 ">
							Turar Joy
						</p>
					</Link>
				</div>
				<div className="">
					<div
						onClick={() => setOpen(!open)}
						className="text-3xl absolute right-2 top-[9px] cursor-pointer md:hidden"
					>
						<ion-icon name={open ? "close" : "menu"}></ion-icon>
					</div>

					<ul className={` flex md:space-x-10   md:items-center md:pb-0 pb-6 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 justify-center transition-all duration-500 ease-in  ${open ? 'top-9 ':'top-[-490px]'}`}>
						<li>
							<Link
								to="/"
								className={`py-3 px-4 block ${
									activeLink === "/"
										? "text-black border-b-[3px] border-b-red-500 "
										: "text-gray-400 "
								}
                `}
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
							>
								Offers
							</Link>
						</li>

						<li>
							<Link
								to="/profile"
								className={`py-3 px-4 block  ${
									activeLink === "/sign-in" || activeLink === "/profile"
										? "text-black border-b-[3px] border-b-red-500 "
										: "text-gray-400 "
								}`}
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
