import React, { useState, useRef, useContext } from "react";
import styles from "./logIn.module.css";
import { messaging } from "../../firebase";
import { getToken } from "firebase/messaging";
// import { useLocation,useNavigate} from 'react-router';
import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
import CredentialsALert from "../../components/alert/CredentialsAlert";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { LinearProgress } from "@mui/material";

export default function Login() {
  const { user } = useContext(AuthContext);
  async function reqPermisions() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      //generating token
      const token = await getToken(messaging, {
        vapidKey:
          "BPwEU3jDJWcWO8RaPjGTD8_B5pCn7BGRErUUP_NkxCPW-AYEi5Eq7HpbRkdvwzeQ1MwfyUG8Qo0Jky0qReZJwJ0",
      });
      try {
        axios.post(
          process.env.REACT_APP_SERVER_URL + "notification//updateToken",
          {
            email: user?.email,
            authToken: localStorage.getItem("AuthToken"),
            fcmToken: token,
          }
        );
        console.log(token);
      } catch (error) {
        console.log(error);
        alert("Unable to Enable Notifications");
      }
    } else if (permission === "denied") alert("Notification Denied");
  }

  const formRef = useRef();
  const navigate = useNavigate();
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const { dispatch, isFetching } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_STARTED" });
    const body = {
      email: formRef.current.Email.value,
      password: formRef.current.Password.value,
    };
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "login",
        body
      );

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: res.data?.user,
          userDetails: res.data?.otherDetails,
        },
      });
      localStorage.setItem("AuthToken", res.data.authToken);
      reqPermisions();
      navigate("/Home");
    } catch (error) {
      setEmailError("INVALID");
      setTimeout(setEmailError(""), 1200);
    }
  };

  return (
    <>
      {isFetching && <LinearProgress />}
      <div className={styles.cntr}>
        <div className="h2 my-5">{process.env.REACT_APP_SITE_NAME}</div>
        <form className={styles.frm} ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="Email"
              aria-describedby="emailHelp"
            />
            {EmailError && <CredentialsALert message={EmailError} />}
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="Password" />
            {PasswordError && <CredentialsALert message={PasswordError} />}
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              disabled={isFetching}
              className="btn btn-primary my-3"
            >
              Login
            </button>
          </div>
          <div className="register">
            Don't have an account? <Link to="/signup">Create New Account</Link>
          </div>
          {/* <div>Already have an account? <Link to="#">Register</Link></div> */}
          {/* to={{pathname:"/register", state:{from:from}}} */}
        </form>
      </div>
    </>
  );
}
