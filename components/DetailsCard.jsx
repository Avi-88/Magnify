import React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

function DetailsCard(props) {
  return (
    <div class="max-w-sm w-full my-4 overflow-hidden rounded-3xl  bg-white mid:max-w-full flex">
      <div class="overflow-hidden w-[40%] border-r-2">
        <img
          alt="item"
          className="w-full h-full object-cover"
          src={props.img}
        />
      </div>
      <div class="max-w-[60%] h-full    p-4 flex flex-col justify-between leading-normal">
        <div class="mb-8">
          <p class="text-sm text-gray-600 flex items-center">
            <Chip
              label={props.type}
              color={props.type == "Lost" ? "error" : "success"}
              variant="outlined"
              size="small"
            />
          </p>
          <div class="text-gray-900 font-bold text-xl mb-2">{props.title}</div>
          <p class="text-gray-700 text-base">{props.description}</p>
        </div>
        <div class="flex items-center">
          <Avatar className="mr-2" alt="contact" src={props.profile} />
          <div class="text-sm">
            <p class="text-gray-900 leading-none mb-1">{props.contact}</p>
            <p class="text-gray-600">{props.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsCard;
