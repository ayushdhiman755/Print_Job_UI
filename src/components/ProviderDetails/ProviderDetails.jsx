import React, { useContext, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../pages/SignUp/signUp.module.css";
import axios from "axios";
import Map from "../Map/Map";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../../Context/AuthContext";
// import Button from "react-bootstrap/esm/Button";

export default function ProviderDetails() {
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

  const [printCat, setPrintCat] = useState([]);
  const formRef = useRef();
  const { user, dispatch } = useContext(AuthContext);
  const [locationCoordinates, setLocationCoordinates] = useState();
  const [map, setMap] = useState(null);
  const [radius, setRadius] = useState();
  const [markerCoordinates, setMarkerCoordinates] = useState([
    20.5937, 78.9629,
  ]);
  const [printOption, setPrintOption] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("firmName", formRef.current.firmName.value);
    formData.append(
      "verificationDocumentType",
      formRef.current.documentType.value
    );
    formData.append("paperSize", JSON.stringify(printOption));
    formData.append("email", user?.email);
    const lc = [locationCoordinates?.longitude, locationCoordinates?.latitude];
    formData.append("location", JSON.stringify(lc));
    formData.append("authToken", localStorage.getItem("AuthToken"));
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    formData.append("City", formRef.current.City.value);
    formData.append("State", formRef.current.State.value);
    formData.append("Phone", formRef.current.Phone.value);
    formData.append("PostalCode", formRef.current.PostalCode.value);
    formData.append("printTypes", JSON.stringify(printCat));
    formData.append("document", formRef.current.VerificationDocument.files[0]);
    try {
      console.log(formData.authToken, "Token");
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}provider/uploadDetails`,
        formData
      );
      console.log("response", res);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: res.data?.user,
          userDetails: res.data?.userDetails,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
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
  return (
    <>
      <div className={styles.cntr + " mb-4"}>
        <div className="h2 my-5">{process.env.REACT_APP_SITE_NAME}</div>
        <form className={styles.frm} ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Firm Name :
            </label>
            <input
              type="text"
              className="form-control"
              id="firmName"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="documentType" className="form-label">
              Select verification document type :
            </label>
            <select className="d-block form-select" id="documentType" required>
              <option value="Aadhar">AADHAR</option>
              <option value="VoterId">Voter's ID</option>
              <option value="Passport">Passport</option>
            </select>
          </div>
          <input
            type="file"
            className="form-control"
            name="VerificationDocument"
            id=""
            accept="image/*,.pdf"
            required
          />
          <div className={"mb-3 mt-2 " + styles.checkBox}>
            <label htmlFor="Types">Types :</label>
            <div id="Types"></div>
            <input
              onChange={(e) => {
                if (e.target.checked) {
                  setPrintCat([...printCat, e.target.value]);
                } else {
                  setPrintCat(printCat.filter((cat) => cat !== e.target.value));
                }
                console.log(printCat);
              }}
              type="checkbox"
              name="B&W"
              value="B&W"
              id=""
            />
            <label htmlFor="B&W">B&W</label>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setPrintCat([...printCat, e.target.value]);
                } else {
                  setPrintCat(printCat.filter((cat) => cat !== e.target.value));
                }
                console.log(printCat);
              }}
              name="Color"
              value="Color"
              id=""
            />
            <label htmlFor="Color">Color</label>
            <input
              onChange={(e) => {
                if (e.target.checked) {
                  setPrintCat([...printCat, e.target.value]);
                } else {
                  setPrintCat(printCat.filter((cat) => cat !== e.target.value));
                }
                console.log(printCat);
              }}
              type="checkbox"
              name="Color Glossy"
              value="Color Glossy"
              id=""
            />
            <label htmlFor="ColorGlossy">Color Glossy</label>
            <input
              onChange={(e) => {
                if (e.target.checked) {
                  setPrintCat([...printCat, e.target.value]);
                } else {
                  setPrintCat(printCat.filter((cat) => cat !== e.target.value));
                }
                console.log(printCat);
              }}
              type="checkbox"
              name="B&W Glossy"
              value="B&W Glossy"
              id=""
            />
            <label htmlFor="B&W Glossy">B&W Glossy</label>
          </div>

          <div className="mb-3 mt-2">
            <label htmlFor="printOptionSelection" className="form-label">
              Paper Size :
            </label>
            {printOption.map((option, index) => (
              <div className="d-flex align-items-center">
                <span id={`${index}PrintOption`} className="my-1 mx-2">
                  {option}
                </span>
                <CloseIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log(printOption.filter((o) => o !== option));
                    setPrintOption(printOption.filter((o) => o !== option));
                  }}
                />
              </div>
            ))}
            <div className="d-flex align-items-center">
              <div style={{ width: "80%" }} className="me-3">
                <select
                  className="d-block form-select"
                  id="printOptionSelection"
                  required
                >
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="A3">A3</option>
                  <option value="A4">A4</option>
                </select>
              </div>
              <AddIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setPrintOption([
                    ...printOption,
                    document.getElementById("printOptionSelection").value,
                  ]);
                }}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="City">City:</label>
            <input
              type="text"
              id="City"
              required
              onFocusCapture={() => {
                console.log("capture");
              }}
              onBlur={() => {
                console.log("focus");
              }}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Phone">Phone:</label>
            <input
              required
              type="number"
              id="Phone"
              onFocusCapture={() => {
                console.log("capture");
              }}
              onBlur={() => {
                console.log("focus");
              }}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="PostalCode">Postal Code:</label>
            <input
              type="text"
              id="PostalCode"
              required
              onFocusCapture={() => {
                console.log("capture");
              }}
              onBlur={() => {
                console.log("focus");
              }}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="State">State : </label>
            <select name="State" id="State" className="form-select" required>
              {allStates.map((state) => (
                <option value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-center"></div>
          <Button
            color="secondary"
            className="form-control"
            onClick={DetechLocation}
          >
            <LocationOnIcon />
            Detect Location
          </Button>
          {
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
          }
          <div
            style={{ display: "flex", justifyContent: "space-around" }}
            className="mt-3"
          >
            <Button
              style={{
                alignSelf: "center",
                backgroundColor: "green",
                color: "yellow",
              }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
