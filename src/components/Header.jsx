import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [activeLink, setActiveLink] = useState("");
  // const [defaultActiveLink, setDefaultActiveLink] = useState("true")

  const handleClick = (path) => {
    setActiveLink(path);
    // setDefaultActiveLink("false")
  };

  // const handleDefault = () => {
  //   setDefaultActiveLink("");
  // }

  useEffect(() => {
    setActiveLink("/")
  },[])

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);

  return (
    <div className="border-b shadow-sm sticky top-0 z-50 ">
      <header className="flex justify-between items-center max-w-6xl mx-auto ">
        <div>
          <p className="text-2xl text-color cursor-pointer " onClick={()=> {
            navigate("/")
            setActiveLink("/")
          }}>Turar Joy </p>
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
                
                onClick={() => {
                  handleClick("/")
                  
                } }
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
                onClick={() => {
                  handleClick("/offers")
                  // handleDefault("false")
                }}
              >
                Offers
              </Link>
            </li>
            <li>
              <Link
                to="/sign-in"
                className={`py-3 px-4 block  ${
                  activeLink === "/sign-in"
                    ? "text-black border-b-[3px] border-b-red-500 "
                    : "text-gray-400 "
                }`}
                onClick={() => {
                  handleClick("/sign-in")
                  // handleDefault()
                }}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
