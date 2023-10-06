import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import markerIconPng from "../Images/285659_marker_map_icon.png";
import { Icon, L } from "leaflet";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

function DraggableMarker({ center, setRadius, setLocationCoordinates }) {
  const [draggable, setDraggable] = useState(false);
  // const [position, setPosition] = useState(center);

  const [position, setPosition] = useState(center);
  // const [position, setPosition] = useState({latitude:center?.latitude,longitude:center?.longitude});
  const markerRef = useRef(null);
  useEffect(() => {
    try {
      center ? setPosition(center) : console.log();
      console.log("marker pos to set", center);
    } catch (error) {
      console.log(error);
    }
  }, [center]);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef?.current;
        if (marker != null) {
          try {
            console.log(marker.getLatLng(), "new markerCoordinates");
            setPosition(marker.getLatLng());
            setLocationCoordinates({
              latitude: marker.getLatLng().lat,
              longitude: marker.getLatLng().lng,
            });
            setRadius(0);
          } catch (error) {
            console.log(error);
          }
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <>
      {position && (
        <Marker
          style={{ position: "absolute" }}
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
          icon={
            new Icon({
              iconSize: [25, 41],
              iconAnchor: [10, 41],
              popupAnchor: [2, -40],
              iconUrl:
                "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
              shadowUrl:
                "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
            })
          }
        >
          <Tooltip>Move Marker to change location</Tooltip>
          {/* <Popup
          minWidth={90}
          style={{ position: "relative !important", top: "-50px!important" }}
          >
          <span onClick={toggleDraggable}>
          {draggable
              ? "Click to fix location"
              : "Click here to drag and select location"}
              </span>
            </Popup> */}
        </Marker>
      )}
    </>
  );
}

export default function Map({
  job,
  markerCoordinates,
  setMarkerCoordinates,
  radius,
  setRadius,
  center,
  map,
  setMap,
  setLocationCoordinates,
  reCenter,
}) {
  const fullScreen = {
    width: job ? "100%" : "80vw",
    height: job?"60vh":"80vh",
  };

  // const map = useMap();

  useEffect(() => {
    console.log(center, "Center");
    setMarkerCoordinates([
      center?.latitude ? center.latitude : 20.5937,
      center?.longitude ? center.longitude : 78.9629,
    ]);
    console.log("Coordinated", markerCoordinates);
  }, [center]);

  // const reCenter = (e) => {
  //   e.preventDefault();

  //   window.navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       const { latitude, longitude, accuracy } = position.coords;
  //       console.log("position = ", position, accuracy);
  //       setRadius(accuracy);
  //       setMarkerCoordinates([latitude, longitude]);
  //       map.flyTo([latitude, longitude], 14);
  //       // map.setView([latitude, longitude], 13);
  //       // const locationDetails = await axios.get(
  //       //   `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${process.env.REACT_APP_GEOLOCATION_API_KEY}`
  //       // );
  //       // console.log(locationDetails);
  //     },
  //     (err) => {
  //       console.log(err);
  //       alert("Please enable site to access location ." + err.message);
  //     },
  //     { timeout: 7000, enableHighAccuracy: true, maximumAge: 0 }
  //   );
  // };
  return (
    <div
      style={{
        width: fullScreen.width,
        height: fullScreen.height,
        // width: fullScreen ? "100vw" : "80vw",
        // height: fullScreen ? "100vh" : "80vh",
        margin: "auto",
      }}
    >
      <MapContainer
        // style={{
        //   width: "100%",
        //   height: "100%",
        //   margin: "auto"
        // }}
        style={{
          width: fullScreen.width,
          height: fullScreen.height,
          // width: fullScreen ? "100vw" : "80vw",
          // height: fullScreen ? "100vh" : "80vh",
          margin: "auto",
        }}
        center={markerCoordinates}
        // center={[center?.latitude||0, center?.longitude||0]}
        zoom={10}
        ref={setMap}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerCoordinates && (
          <DraggableMarker
            center={markerCoordinates}
            setRadius={setRadius}
            setLocationCoordinates={setLocationCoordinates}
          />
        )}
        {radius && <Circle center={markerCoordinates} radius={radius} />}
        <FullscreenControl position="topleft" icon={<MyLocationIcon />} />
      </MapContainer>
      <MyLocationIcon
        style={{
          color: "blue",
          float: "right",
          position: "relative",
          top: "-30px",
          zIndex: 100000,
          cursor: "pointer",
        }}
        onClick={reCenter}
      />
      {/* {fullScreen.width==="100vw" ? (
        <FullscreenExitIcon
          style={{
            color: "blue",
            float: "right",
            position: "relative",
            top: "-30px",
            zIndex: 100000,
            cursor: "pointer",
          }}
          onClick={(e) => {
            setFullScreen({width:"80vw",height:"80vh"});
            reCenter(e);
          }}
          />
          ) : (
            <FullscreenIcon
            style={{
              color: "blue",
              float: "right",
              position: "relative",
              top: "-30px",
              zIndex: 100000,
              cursor: "pointer",
            }}
            onClick={(e) => {
              setFullScreen({width:"100vw",height:"100vh"});
              // setFullScreen((f) => !f);
              reCenter(e);
          }}
        />
      )} */}
    </div>
  );
}
