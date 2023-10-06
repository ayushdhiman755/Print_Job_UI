import React, { useContext, useEffect, useLayoutEffect, useState } from "react";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import ProviderDetails from "./components/ProviderDetails/ProviderDetails";
import Map from "./components/Map/Map";
import PrinterDetect from "./components/Printer/PrinterDetect";
import AssignedJobs from "./components/AssignedJobs/AssignedJobs";
import ProposedJobs from "./components/ProposedJobs/ProposedJobs";
import ProviderProfile from "./components/ProviderProfile/ProviderProfile";
import CreateJob from "./components/CreateJob/CreateJob";
import UserDetailsForm from "./components/UserDetails/UserDetailsForm";
import UserDashBoard from "./components/UserDashBoard/UserDashBoard";
import UserOrders from "./components/UserOrders/UserOrders";
import UserProfile from "./components/UserProfile/UserProfile";
import axios from "axios";
import { AuthContext } from "./Context/AuthContext";
import { LinearProgress } from "@mui/material";

export default function App() {
  const [loading, setLoading] = useState(0);
  // if(localStorage.getItem(AuthToken))
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const fetchAllDetails = async () => {
    if (localStorage.getItem("AuthToken")) {
      setLoading(40);
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "login/getAll",
        { authToken: localStorage.getItem("AuthToken") }
      );
      setLoading(80);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: res.data?.user,
          userDetails: res.data?.otherDetails,
        },
      });
    }
  };
  useLayoutEffect(() => {
    setLoading(10);
    // if (localStorage.getItem("AuthToken")) {
    setLoading(20);
    fetchAllDetails();
    setLoading(95);
    // } else {
    //   navigate("/");
    // }

    setLoading(0);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* {loading > 0 && <LinearProgress variant="determinate" value={loading} />} */}
      {/* <ProviderDetails/> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/assignedJobs" element={<AssignedJobs />} />
        <Route path="/proposedJobs" element={<ProposedJobs />} />
        <Route path="/profile" element={<ProviderProfile />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/MyOrders" element={<UserOrders />} />
        <Route path="/createJob" element={<CreateJob />} />
      </Routes>
    </>
  );
}
