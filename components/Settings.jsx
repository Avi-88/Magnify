import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SailingIcon from "@mui/icons-material/Sailing";
import ForestIcon from "@mui/icons-material/Forest";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Settings = (props) => {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(props.lastTime);
  const [breakTime, setBreakTime] = useState(props.lastBreak);
  const [theme, setTheme] = useState(props.lastTheme);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTheme(props.lastTheme);
    setBreakTime(props.lastBreak);
    setSession(props.lastTime);
    setOpen(false);
  };

  const handleSessionTimeChange = (e) => {
    setSession(e.target.value);
  };

  const handleBreakTimeChange = (e) => {
    setBreakTime(e.target.value);
  };

  const handleTheme = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="lg:mt-6 mt-4">
      <IconButton
        className="text-slate-400 hover:text-white   hover:rotate-180 hover:origin-center hover:transition hover:duration-700 hover:ease-in-out"
        onClick={handleClickOpen}
        color="primary"
        aria-label="upload picture"
        component="span"
      >
        <SettingsIcon
          className="text-slate-400 hover:text-white "
          sx={{
            width: { lg: 35, md: 30, sm: 30 },
            height: { lg: 35, md: 30, sm: 30 },
          }}
        />
      </IconButton>

      <div className="w-full ">
        <Dialog
          sx={{ padding: 4 }}
          open={open}
          scroll="paper"
          onClose={handleClose}
          TransitionComponent={Transition}
          PaperProps={{
            style: {
              background:
                "linear-gradient(to right bottom, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))",
              paddingVertical: 4,
              paddingHorizontal: 6,
              border: "1px solid gray",
              borderRadius:20,
              minWidth: "300px",
            },
          }}
          fullWidth
        >
          <DialogTitle className="text-center text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text  ">
            <p className="font-kumbh font-bold tracking-widest">SETTINGS</p>
          </DialogTitle>
          <DialogContent
            className="overflow-hidden"
            sx={{
              overflow: "hidden",
            }} 
          >
            <div className="p-2 ">
              <div className="mb-6 sml:m-0 bg-gradient-to-r font-semibold from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent font-kumbh tracking-widest whitespace-nowrap">
                <p className="text-sm sml:text-lg">SET TIMER :</p>
              </div>
              <div className=" flex flex-col   sml:flex-row sml:justify-around items-center">
                <div className="sml:w-10/12 w-full flex justify-around items-center">
                  <input
                    className="w-full slider"
                    type="range"
                    min="5"
                    max="120"
                    value={session}
                    onChange={handleSessionTimeChange}
                    step={5}
                  />
                </div>
                <div className="w-12 px-4 my-4 py-2 bg-gray-800 text-white rounded-lg flex justify-center items-center">
                  <p>{session}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <div className="mb-6 sml:m-0 bg-gradient-to-r font-semibold from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent font-kumbh tracking-widest whitespace-nowrap">
                <p className="text-sm sml:text-lg">SET BREAK TIMER :</p>
              </div>
              <div className=" flex flex-col   sml:flex-row sml:justify-around items-center">
                <div className="sml:w-10/12 w-full flex justify-around items-center">
                  <input
                    className="w-full slider"
                    type="range"
                    min="5"
                    max="15"
                    value={breakTime}
                    onChange={handleBreakTimeChange}
                    step={1}
                  />
                </div>
                <div className="w-12 px-4 my-4 py-2 bg-gray-800 text-white rounded-lg flex justify-center items-center">
                  <p>{breakTime}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <div className="sml:mb-6 sml:m-0 bg-gradient-to-r font-semibold from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent font-kumbh tracking-widest whitespace-nowrap">
                <p className="text-sm sml:text-lg">SET THEME :</p>
              </div>
              <div className=" flex justify-around items-center">
                <input
                  id="ocean"
                  className="hidden"
                  onChange={handleTheme}
                  type="radio"
                  name="credit-card"
                  value="ocean"
                />
                <label
                  className={
                    theme === "ocean"
                      ? "bg-gray-800 rounded-full p-4 text-white mt-4 cursor-pointer border border-gray-300"
                      : "bg-gray-600 rounded-full p-4 text-white mt-4 cursor-pointer opacity-30 hover:opacity-50"
                  }
                  htmlFor="ocean"
                >
                  <SailingIcon
                    sx={{
                      width: { lg: 35, md: 30, sm: 30 },
                      height: { lg: 35, md: 30, sm: 30 },
                    }}
                  />
                </label>
                <input
                  id="rain"
                  className="hidden"
                  onChange={handleTheme}
                  type="radio"
                  name="credit-card"
                  value="rain"
                />
                <label
                  className={
                    theme === "rain"
                      ? "bg-gray-800 rounded-full p-4 text-white mt-4 cursor-pointer border border-gray-300"
                      : "bg-gray-600 rounded-full p-4 text-white mt-4 cursor-pointer opacity-30 hover:opacity-50"
                  }
                  htmlFor="rain"
                >
                  <NightsStayIcon
                    sx={{
                      width: { lg: 35, md: 30, sm: 30 },
                      height: { lg: 35, md: 30, sm: 30 },
                    }}
                  />
                </label>
                <input
                  id="forest"
                  className="hidden"
                  onChange={handleTheme}
                  type="radio"
                  name="credit-card"
                  value="forest"
                />
                <label
                  className={
                    theme === "forest"
                      ? "bg-gray-800 rounded-full p-4 text-white mt-4 cursor-pointer border border-gray-300"
                      : "bg-gray-600 rounded-full p-4 text-white mt-4 cursor-pointer opacity-30 hover:opacity-50"
                  }
                  htmlFor="forest"
                >
                  <ForestIcon
                    sx={{
                      width: { lg: 35, md: 30, sm: 30 },
                      height: { lg: 35, md: 30, sm: 30 },
                    }}
                  />
                </label>
              </div>
            </div>
          </DialogContent>
          <div className="flex justify-around items-center p-4">
            <Button
              className="text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text "
              onClick={handleClose}
            >
              <p className="font-kumbh tracking-widest font-semibold">Cancel</p>
            </Button>
            <Button
              className="text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text "
              onClick={() => {
                props.sessionInput(session);
                props.currentInput(session * 60);
                props.breakInput(breakTime);
                props.themeInput(theme);
                setOpen(false);
              }}
            >
              <p className="font-kumbh tracking-widest font-semibold">apply</p>
            </Button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Settings;
