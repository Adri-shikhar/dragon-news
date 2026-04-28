import React from "react";
import Marquee from "react-fast-marquee";

const newsItems = [
  "Breaking News: Market Hits All-Time High!",
  "Sports Update: Local Team Wins Championship!",
  "Weather Alert: Heavy Rain Expected Tomorrow!",
  "Tech News: New Smartphone Released Today!",
  "Health Tips: How to Stay Fit During Winter!",
];

const NewsMarqueee = () => {
  return (
    <div className="bg-gray-200 p-4 flex items-center justify-between mx-auto container">
      <button className="bg-red-500 text-white px-4 py-2 rounded">
        Latest
      </button>
      <Marquee pauseOnHover pauseOnClick speed={100}>
        {newsItems.map((item, index) => (
          <span key={index} className="mx-10 text-black font-bold">
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default NewsMarqueee;
