import { useState } from "react";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import MapIcon from "@mui/icons-material/Map";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Switch from "@mui/material/Switch";
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

import { connect } from "react-redux";
import DropDown from "./DropDown";

const TopNav = (props) => {
  const [drop, setDrop] = useState(false);
  console.log("satellite", props.mode);

  return (
    <div className="text-white p-2 bg-gray-600 w-full firefox:bg-opacity-60 relative flex justify-center items-center  bg-opacity-20 backdrop-filter backdrop-blur-md">
      <ul className="flex justify-around items-center p-2">
        <li className="px-8 py-1 ">
          <Link href="/">
            <a>
              <MapIcon sx={{ width: 30, height: 30 }} />
            </a>
          </Link>
        </li>
        <li className="px-8 py-1 ">
          <Link href="/history">
            <a>
              <DashboardIcon sx={{ width: 30, height: 30 }} />
            </a>
          </Link>
        </li>
        <li className="px-8 ">
          {props.currentUser.email == null ? (
            <Link href="/login">
              <a>
                <LoginIcon sx={{ width: 30, height: 30 }} />
              </a>
            </Link>
          ) : (
            <DropDown toggle={setDrop} open={drop} />
          )}
        </li>
      </ul>
      <div className="absolute right-5">
        <SatelliteAltIcon sx={{ width: 25, height: 25, marginRight:"4px" }}/>
        <Switch checked={props.mode} onChange={() => props.setMode()} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user,
    mode: state.mode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMode: () => dispatch({ type: "SET_MODE" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
