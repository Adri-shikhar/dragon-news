import React from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import Mylink from "./Mylink";
const newsItems = [
    "Breaking News: Market Hits All-Time High!",
    "Sports Update: Local Team Wins Championship!",
    "Weather Alert: Heavy Rain Expected Tomorrow!",
    "Tech News: New Smartphone Released Today!",
    "Health Tips: How to Stay Fit During Winter!",
];

const Navbar = () => {
  return (
    <div>
      <div className="bg-gray-200  p-4 flex items-center justify-between mx-auto container">
        <button className="bg-red-500 text-white px-4 py-2 rounded"> Latest</button>
        <Marquee pauseOnHover pauseOnClick speed={100}>
          {newsItems.map((item, index) => (
            <span key={index} className="mx-10 text-black font-bold">
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="flex gap-4 justify-center py-4">
        <Mylink href="/Home">Home</Mylink>
        <Mylink href="/About">About</Mylink>
        <Mylink href="/Career">Career</Mylink>
      </div>
    </div>
  );
};

export default Navbar;
