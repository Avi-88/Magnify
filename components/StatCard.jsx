import React from "react";
import Chip from "@mui/material/Chip";

function StatCard(props) {
  return (
    <div className="flex flex-col sml:flex-row flex-auto  shadow-xl my-4 min-h-[80px]  max-h-[120px] justify-between items-start rounded-lg firefox:bg-opacity-60  bg-opacity-20 backdrop-filter backdrop-blur-sm  bg-white p-2 w-full">
      <div className="flex shadow-lg justify-start items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-px rounded-md ml-2 -mt-[30px]">
        <div className="flex w-20 h-20  justify-center items-center bg-slate-800 p-2 rounded-md">
          <img
            alt="item"
            className="object-contain h-full w-full"
            src={props.img}
          />
        </div>
      </div>

      <div className="flex justify-between mt-2  sml:mt-0 h-full items-end w-full flex-col px-2">
        <span class="relative flex h-3 w-3">
          <span className={"animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 " + (props.type === 'Lost' ? "bg-red-400" : "bg-green-400")}></span>
          <span class={"relative inline-flex rounded-full h-3 w-3 " + (props.type == 'Lost' ? "bg-red-500":"bg-green-500")}></span>
        </span>
        <div className="flex justify-center h-full items-end w-full flex-col">
          <p className="text-white font-bold text-lg">{props.title}</p>
          <p className="text-white font-semibold text-left sml:text-right text-xs  w-full">
            {props.date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
