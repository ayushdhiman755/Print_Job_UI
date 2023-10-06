import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signUp.module.css";
import CredentialsALert from "../../components/alert/CredentialsAlert";
import axios from "axios";
import { messaging } from "../../firebase";
import { getToken } from "firebase/messaging";
import { AuthContext } from "../../Context/AuthContext";
import { LinearProgress } from "@mui/material";

export default function SignUp(props) {
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
        console.log(error)
        alert("Unable to Enable Notifications");
      }
    } else if (permission === "denied") alert("Notification Denied");
  }
  const formRef = useRef();
  const [emailAlert, setEmailAlert] = useState();
  const [passwordAlert, setPAsswordAlert] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    if (
      formRef.current.Password.value !== formRef.current.ConfirmPassword.value
    ) {
      setPAsswordAlert("Please write same passwords");
      setTimeout(() => {
        setPAsswordAlert("");
      }, 1500);
      dispatch({ type: "LOGIN_FAILURE", payload: "Password not same" });
      return;
    }
    const body = {
      userName: formRef.current.Name.value,
      email: formRef.current.Email.value,
      password: formRef.current.Password.value,
      type: formRef.current.type.value,
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "signup",
        body
      );
      console.log(response);
      localStorage.setItem("AuthToken", response.data.authToken);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: response.data?.user,
          userDetails: response.data?.userDetails,
        },
      });
      reqPermisions();
      navigate("/Home");
    } catch (error) {
      if (error.response.status === 406) setEmailAlert(error.response.data);
      setTimeout(() => {
        setEmailAlert("");
      }, 1200);
    }
  };
  return (
    <>
      {isFetching && <LinearProgress />}
      <div className={styles.cntr}>
        <div className="h2 my-4" style={{ marginTop: "1000px !important" }}>
          {process.env.REACT_APP_SITE_NAME}
        </div>
        <form className={styles.frm} ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name:
            </label>
            <input
              required
              type="text"
              className="form-control"
              id="Name"
              minLength={3}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email address :
            </label>
            <input
              type="email"
              className="form-control"
              id="Email"
              aria-describedby="emailHelp"
              required
            />
            {emailAlert && (
              <CredentialsALert message={emailAlert}></CredentialsALert>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password :
            </label>
            <input
              required
              type="password"
              className="form-control"
              id="Password"
              minLength={6}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ConfirmPassword" className="form-label">
              Confirm Password :
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="ConfirmPassword"
            />
            {passwordAlert && <CredentialsALert message={passwordAlert} />}
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Register as :
            </label>
            <div>
              <span className="mx-2">
                <input
                  className="ms-2"
                  type="radio"
                  value={"User"}
                  name="type"
                  required
                  id="type1"
                />
                <label htmlFor="type1" className="form-label">
                  User
                </label>
              </span>
              <span>
                <input
                  type="radio"
                  required
                  value={"Provider"}
                  name="type"
                  id="type2"
                />
                <label htmlFor="type2" className="form-label">
                  Service Provider
                </label>
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              style={{ minWidth: "10vw" }}
              className="btn btn-primary mx-auto"
              disabled={isFetching}
            >
              Register
            </button>
          </div>
          <div className="register">
            Already have an account? <Link to="/login">Login</Link>
          </div>
          {/* <div>Already have an account? <Link to="#">Register</Link></div> */}
        </form>
      </div>
    </>
  );
}
