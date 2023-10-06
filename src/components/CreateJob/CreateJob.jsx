import React, { useContext, useRef, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Container } from "@mui/material";
import Button from "react-bootstrap/Button";
import Map from "../Map/Map";
import "./createJob.css";
import ConfirmModal from "./ConfirmModal";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
export default function CreateJob() {
  const { user, userDetails, dispatch } = useContext(AuthContext);
  // modal Variables
  const [show, setShow] = useState(false);
  const [cost, setCost] = useState();
  const [createdJobId, setcreatedJobId] = useState();
  const [loading, setLoading] = useState(false);
  const confirmOrder = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "user/confirmOrder",
        { authToken: localStorage.getItem("AuthToken"), jobId: createdJobId }
      );
      if (res.status == 200) {
        let newUserDetails = userDetails;
        userDetails.jobs.unshift(createdJobId);
        dispatch({
          type: "SET_DETAILS",
          payload: { userDetails: newUserDetails },
        });
        alert("Order Confirmed");
        setShow(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelOrder = async () => {
    if (loading) return;
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "user/cancelOrder",
        { authToken: localStorage.getItem("AuthToken"), jobId: createdJobId }
      );
    } catch (err) {
      console.log(err);
    }
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleSubmitt = async (e) => {
    e.preventDefault();
    if (!locationCoordinates) {
      alert("Please Set a Location");
    } else {
      try {
        setLoading(true);
        setShow(true);
        console.log(user, "USER");
        let data = new FormData();
        data.append("createdBy", user.email);
        data.append(
          "deliveryLocation",
          JSON.stringify([
            locationCoordinates?.longitude,
            locationCoordinates?.latitude,
          ])
        );
        data.append("Document", formRef.current.document.files[0]);
        data.append("deliveryDate", JSON.stringify(formRef.current.deliveryDate.value));
        data.append("numberOfCopies", formRef.current.numberOfCopies.value);
        data.append("typeOfCopy", formRef.current.typeOfCopy.value);
        data.append("sizeOfPaper", formRef.current.sizeOfPaper.value);
        if (formRef.current.additionalInstruction.value) {
          data.append(
            "additionalInstruction",
            formRef.current.additionalInstruction.value
          );
        }
        const res = await axios.post(
          process.env.REACT_APP_SERVER_URL + "user/createOrder",
          data
        );
        setCost(res.data.userPrice);
        setcreatedJobId(res.data._id);
        console.log(res, "estimage response");
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const formRef = useRef();
  const estimatePrice = () => {};
  //map Variables
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

  return (
    <>
      <NavBar user />
      <Container
        style={{
          marginTop: "50px",
          boxShadow: "4px 4px 94px 24px gray",
          borderRadius: "1em",
          padding: "1em",
        }}
      >
        <div>
          <h3 style={{ textAlign: "center" }}>New Order</h3>
          <div style={{ color: "red", textAlign: "center" }}>
            <sup>*</sup>Fields are Mendatory
          </div>
          <form id="jobCreationForm" ref={formRef} onSubmit={handleSubmitt}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 5fr",
                rowGap: "8px",
              }}
            >
              <span>
                Delivery Date<sup>*</sup>
              </span>
              <input
                required
                type="date"
                name=""
                id="deliveryDate"
                className="form-control"
              />
              <span>
                Document<sup>*</sup>
              </span>
              <input
                required
                type="file"
                name="document"
                id="document"
                className="form-control"
              />
              <span>
                Copies <sup>*</sup>
              </span>
              <input
                required
                min={1}
                defaultValue={1}
                type="number"
                name=""
                id="numberOfCopies"
                className="form-control"
              />
              <span>
                Paper<sup>*</sup>
              </span>
              <select className="form-select" id="sizeOfPaper" required>
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="A2">A2</option>
                <option value="A1">A1</option>
              </select>
              <span>
                Type<sup>*</sup>
              </span>
              <select
                name="typeOfCopy"
                id="typeOfCopy"
                className="form-select"
                required
              >
                <option value="one-sided">One sided</option>
                <option value="both-sided">Both sided</option>
              </select>
              <span>Instructions</span>
              <textarea
                name="additionalInstruction"
                id="additionalInstruction"
                className="form-control"
              ></textarea>
            </div>
            <div id="DL" style={{ textAlign: "center", marginTop: "10px" }}>
              Delivery Location
              <sup>* </sup>
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
              }}
            >
              <Button
                variant="info"
                className="my-3"
                type="submit"
                onClick={estimatePrice}
              >
                Estimate Cost
              </Button>

              <ConfirmModal
                show={show}
                handleClose={handleClose}
                confirmOrder={confirmOrder}
                cancelOrder={cancelOrder}
                loading={loading}
                formRef={formRef}
                cost={cost}
              />
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
