import React from "react";
import Avatar from "@mui/material/Avatar";
import { auth } from "../config/FirebaseConfig";
import { connect } from "react-redux";
import { signOut } from "firebase/auth";

function DropDown(props) {
  const logout = async () => {
    await signOut(auth);
    props.setUser({ isLoggedIn: false });
  };

  return (
    <div className="relative flex justify-center items-center rounded-md">
      <Avatar
        alt="Remy Sharp"
        sx={{ width: 35, height: 35 }}
        src={props.currentUser?.img}
        onClick={() => {
          props.toggle(!props.open);
        }}
      />
      <div
        className={
          "absolute z-10 -bottom-11 left-0 text-white bg-slate-800 rounded-md  w-20 " +
          (props.open ? "flex flex-col justify-center items-center" : "hidden")
        }
      >
        <div
          onClick={logout}
          className="hover:bg-gray-600 p-2 w-full rounded-md flex justify-center items-center cursor-pointer"
        >
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: "SET_USER", value: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
