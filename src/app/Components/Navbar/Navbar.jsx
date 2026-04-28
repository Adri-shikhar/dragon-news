import React from "react";
import Link from "next/link";

import Mylink from "./Mylink";

const Navbar = () => {
  return (
    <div>
    
      <div className="py-4">
        <div className="mx-auto container grid grid-cols-3 items-center">
          <div />
          <div className="flex gap-4 justify-center">
            <Mylink href="/">Home</Mylink>
            <Mylink href="/About">About</Mylink>
            <Mylink href="/Career">Career</Mylink>
          </div>
          <div className="flex justify-end">
            <Link
              href="/SignIn"
              className="bg-gray-800 text-white px-6 py-2 rounded transition-colors duration-200 hover:bg-gray-700"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
