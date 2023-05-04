import { useLocation } from "react-router-dom";
// import React from "react";

export default function Header() {
  const location = useLocation();
  console.log(location.pathname);
  function pathMathRouter(route) {
    if (route === location.pathname) {
      return true
    }
  }
  return (
    <div className="border-b shadow-sm sticky top-0 z-50 ">
      <header className="flex justify-between items-center max-w-6xl mx-auto ">
        <div>
          <p className="text-2xl text-color cursor-pointer ">Turar Joy </p>
        </div>
        <div>
            <ul className="flex  space-x-10">
            <li
              className={`py-3 font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRouter("/") && "text-[#000] border-b-red-400"
              }`}
            >
              Home
            </li>

            <li
              className={`py-3 font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRouter("/offers") && "text-[#000] border-b-red-400 "
              }`}
            >
              Offers
            </li>

            <li
              className={`py-3 font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRouter("/sign-in") && "text-[#000] border-b-red-400 " 
              }`}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
