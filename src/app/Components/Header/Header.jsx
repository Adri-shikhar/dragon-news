import React from "react";
import Image from "next/image";
import { compareAsc, format } from "date-fns";


import logo from "@/app/assets/logo.png";

const Header = () => {
  return (
    <div className="py-10 text-center space-y-4">
      <Image src={logo} alt="Logo" height={60} width={471} className="mx-auto"/>
      <p>Journalism Without Fear or Favour</p> 
      <p>{format(new Date(), "EEEE, MMMM d,yyyy")}</p>

    </div>
  );
};

export default Header;
