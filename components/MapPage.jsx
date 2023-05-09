import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import styled from "@emotion/styled";
import FormLabel from "@mui/material/FormLabel";
import { doc, setDoc } from "firebase/firestore";
import { v1 as uuidv1 } from "uuid";
import { db } from "../config/FirebaseConfig";
import { connect } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY3J5b2xpdGUiLCJhIjoiY2xoZG91YTYwMWRvNjNrcWZsZDVhMGVvdSJ9.eOPkcqKUxcVqOAsabZ11cg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#2979ff",
  },
  "& label": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "#5393ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2979ff",
    },
  },
});

const MapPage = ({ items, change, currentUser, mode }) => {
  const [map, setMap] = useState(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState([]);
  const [itemType, setItemType] = useState("Lost");
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemImageUrl, setItemImageUrl] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("info");

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  var today = new Date();

  const buildings = [
    {
      id: 1,
      name: "CS Dept",
      location: [73.884319, 18.459446],
    },
    {
      id: 2,
      name: "IT Dept",
      location: [73.884782, 18.45945],
    },
    {
      id: 3,
      name: "AI/DS Dept",
      location: [73.885113, 18.459527],
    },
    {
      id: 4,
      name: "Workshop",
      location: [73.885478, 18.459503],
    },
    {
      id: 5,
      name: "fruit-n-fruit",
      location: [73.88546, 18.45969],
    },
    {
      id: 6,
      name: "Canteen",
      location: [73.885576, 18.459898],
    },
    {
      id: 7,
      name: "Building E",
      location: [73.884486, 18.460158],
    },
    {
      id: 8,
      name: "VIIT Ground",
      location: [73.885169, 18.460338],
    },
  ];

  const center = [73.884018, 18.459581];

  useEffect(() => {
    const bounds = [
      [center[0] - 0.0018, center[1] - 0.002], // bottom left corner
      [center[0] + 0.002, center[1] + 0.0018], // top right corner
    ];

    const newMap = new mapboxgl.Map({
      container: "map",
      style: mode
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/dark-v11",
      center: center,
      zoom: 16,
      maxBounds: bounds,
      doubleClickZoom: false,
    });

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, [mode]);

  useEffect(() => {
    if (map) {
      // Add markers to the map for each item
      items.forEach((item) => {
        new mapboxgl.Marker({
          color: item.type === "Lost" ? "red" : "green",
        })
          .setPopup(
            new mapboxgl.Popup(item).setHTML(`
          <div style="font-size: 16px; color: #333;padding: 4px">
            <img src=${
              item.img
            } style="width: 100%; object-fit: contain; margin-bottom: 4px"/>
            <p style="${
              item.type == "Lost"
                ? "color:red; font-weight:bold"
                : "color:green; font-weight:bold"
            }">${item.type}</p>
            <h2>${item.title}</h2>
            <p>${item.date}</p>
          </div>
        `)
          )
          .setLngLat(item.location)
          .addTo(map);

        // Add a click event listener to each marker to open a modal
        // marker.getElement().addEventListener("click", () => {
        //   // Open a modal with the details of the item
        //   console.log(`Clicked marker ${item.name}`);
        // });
      });

      buildings.forEach((item) => {
        const el = document.createElement("div");
        el.className = "annotation";
        el.innerHTML = `* ${item.name}`;
        new mapboxgl.Marker(el).setLngLat(item.location).addTo(map);

        // Add a click event listener to each marker to open a modal
        // marker.getElement().addEventListener("click", () => {
        //   // Open a modal with the details of the item
        //   console.log(`Clicked marker ${item.name}`);
        // });
      });
    }
  }, [map, items]);

  useEffect(() => {
    if (map) {
      const onClick = (e) => {
        const lngLat = e.lngLat;
        if (currentUser.isLoggedIn) {
          setLocation([lngLat.lng, lngLat.lat]);
          setOpen(true);
        } else {
          setOpenAlert(true);
          setMsg("You need to login to make a report !");
          setType("warning");
        }
      };

      map.on("dblclick", onClick);

      return () => {
        map.off("dblclick", onClick);
      };
    }
  }, [map, currentUser]);

  const handleClose = () => {
    setItemType("Lost");
    setItemTitle("");
    setItemImageUrl("");
    setOpen(false);
  };

  const handleAlerts = (msg, type) => {
    return (
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={type}
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    );
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleReportItem = async () => {
    try {
      const reportId = uuidv1();
      const sessionRef = doc(db, "reports", reportId);

      await setDoc(sessionRef, {
        type: itemType,
        title: itemTitle,
        date: today.toLocaleDateString("en-US", options),
        contact: currentUser.email,
        img: itemImageUrl,
        location: location,
      });
      setOpenAlert(true);
      setMsg("Report published successfully");
      setType("success");

      setTimeout(function () {
        change(true);
      }, 2000);
      handleClose();
    } catch (error) {
      console.log("err", error);
      setOpenAlert(true);
      setMsg("Something went wrong !");
      setType("error");
    }
  };

  return (
    <>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
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
              borderRadius: 20,
              minWidth: "300px",
            },
          }}
          fullWidth
        >
          <DialogTitle className="text-center text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text  ">
            <p className="font-kumbh font-bold tracking-widest">
              Want to report an Item ?
            </p>
          </DialogTitle>
          <DialogContent
            className="overflow-hidden"
            sx={{
              overflow: "hidden",
              color: "white",
            }}
          >
            <form>
              <FormLabel
                sx={{ color: "white" }}
                id="demo-row-radio-buttons-group-label"
              >
                Report type :
              </FormLabel>
              <RadioGroup
                value={itemType}
                onChange={(event) => setItemType(event.target.value)}
                row
              >
                <FormControlLabel
                  value="Found"
                  control={<Radio />}
                  label="Found"
                />
                <FormControlLabel
                  value="Lost"
                  control={<Radio />}
                  label="Lost"
                />
              </RadioGroup>
              <CustomTextField
                label="Title"
                value={itemTitle}
                InputProps={{
                  style: { color: "white" },
                }}
                onChange={(e) => setItemTitle(e.target.value)}
                fullWidth
                sx={{ color: "white" }}
                margin="normal"
              />
              <CustomTextField
                label="Description"
                value={itemDescription}
                multiline
                rows={4}
                InputProps={{
                  style: { color: "white" },
                }}
                onChange={(e) => setItemDescription(e.target.value)}
                fullWidth
                margin="normal"
              />
              <CustomTextField
                label="Image URL"
                value={itemImageUrl}
                InputProps={{
                  style: { color: "white" },
                }}
                onChange={(e) => setItemImageUrl(e.target.value)}
                fullWidth
                margin="normal"
              />
            </form>
          </DialogContent>
          <div className="flex justify-around items-center p-4">
            <Button
              className="text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text "
              onClick={handleClose}
            >
              <p className="font-kumbh tracking-widest font-semibold">Cancel</p>
            </Button>
            <Button
              onClick={handleReportItem}
              className="text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text "
            >
              <p className="font-kumbh tracking-widest font-semibold">apply</p>
            </Button>
          </div>
        </Dialog>
      </div>
      {handleAlerts(msg, type)}
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
