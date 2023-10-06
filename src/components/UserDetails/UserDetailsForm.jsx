import { Container, useColorScheme } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import AddPhotoAlternateSharpIcon from "@mui/icons-material/AddPhotoAlternateSharp";
import Map from "../Map/Map";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function UserDetailsForm() {
  const { user, dispatch } = useContext(AuthContext);
  const allStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Madhya Pradesh",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Tripura",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman & Nicobar ",
    "Chandigarh ",
    "Dadra & Nagar Haveli and Daman & Diu ",
    "Delhi ",
    "Jammu & Kashmir ",
    "Ladakh ",
    "Lakshadweep ",
    "Puducherry ",
  ];
  const formRef = useRef();
  const LocationBtn = useRef();
  const imageRef = useRef();
  const [img, setimg] = useState();
  //Location Detection
  const [map, setMap] = useState(null);
  const [radius, setRadius] = useState();
  const [locationCoordinates, setLocationCoordinates] = useState();
  const [markerCoordinates, setMarkerCoordinates] = useState([
    20.5937, 78.9629,
  ]);
  const DetechLocation = (e) => {
    e.preventDefault();
    window.navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log("position = ", position, accuracy);
        setRadius(accuracy);
        console.log("radius", accuracy);
        setLocationCoordinates({ latitude, longitude });
        setMarkerCoordinates([latitude, longitude]);
        map.flyTo([latitude, longitude], 14);
      },
      (err) => {
        console.log(err);
        alert("Please enable site to access location ." + err.message);
      },
      { timeout: 7000, enableHighAccuracy: true, maximumAge: 0 }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const LC = [locationCoordinates?.longitude, locationCoordinates?.latitude];
    console.log("d", LC);
    if (!LC[0]) {
      alert("location is required");
      return;
    }
    let data = new FormData();
    data.append("Phone", formRef.current.Phone.value);
    data.append("City", formRef.current.City.value);
    data.append("PostalCode", formRef.current.PostalCode.value);
    data.append("State", formRef.current.State.value);
    data.append("Location", JSON.stringify(LC));
    data.append("email", user.email);

    if (
      formRef.current.ProfileImage.files &&
      formRef.current.ProfileImage.files[0]
    )
      data.append("ProfileImage", formRef.current.ProfileImage.files[0]);
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "user/uploadDetails",
        data
      );
      console.log("resp", res);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: res.data?.user,
          userDetails: res.data?.userDetails,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container
        style={{
          marginTop: "50px",
          boxShadow: "4px 4px 94px 24px gray",
          borderRadius: "1em",
          padding: "1em",
        }}
      >
        <div>
          <h3 style={{ textAlign: "center" }}>Enter Details</h3>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={
                  img
                    ? img
                    : "https://ucarecdn.com/65c1476b-7939-4802-a0be-67bf017a57f5/"
                }
                style={{
                  borderRadius: "50%",
                  width: "6rem",
                  height: "6rem",
                  textAlign: "center",
                  margin: "8px",
                  objectFit: "cover",
                }}
              />
              <div>
                <span
                  style={{
                    display: "flex",
                    marginBottom: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    imageRef.current.click();
                  }}
                >
                  <AddPhotoAlternateSharpIcon style={{ cursor: "pointer" }} />
                  Update Image
                </span>
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0])
                    setimg(URL.createObjectURL(e.target.files[0]));
                  else setimg(null);
                }}
                ref={imageRef}
                name="ProfileImg"
                id="ProfileImage"
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 5fr",
                rowGap: "8px",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span className="fw-bold">
                Phone
                <sup>*</sup>
              </span>
              <input
                type="Number"
                min={1000000000}
                max={9999999999}
                required
                id="Phone"
                className="form-control"
              />
              <span className="fw-bold">
                City
                <sup>*</sup>
              </span>
              <input type="text" required id="City" className="form-control" />
              <span className="fw-bold">
                Postal Code
                <sup>*</sup>
              </span>
              <input
                type="text"
                required
                id="PostalCode"
                className="form-control"
              />

              <span className="fw-bold">
                State
                <sup>*</sup>
              </span>
              <select name="State" id="State" className="form-select" required>
                {allStates.map((state) => (
                  <option value={state}>{state}</option>
                ))}
              </select>
              <span className="fw-bold ">
                Current Location
                <sup>*</sup>
              </span>
              <input
                type="text"
                class="btn btn-secondary"
                ref={LocationBtn}
                onClick={DetechLocation}
                style={{ color: "white", caretColor: "transparent" }}
                value="Auto Detect"
              ></input>
            </div>

            <Map
              job
              setRadius={setRadius}
              radius={radius}
              markerCoordinates={markerCoordinates}
              setMarkerCoordinates={setMarkerCoordinates}
              map={map}
              setMap={setMap}
              center={locationCoordinates}
              setLocationCoordinates={setLocationCoordinates}
              reCenter={DetechLocation}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <button type="submit" class="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
