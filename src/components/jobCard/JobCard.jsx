import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import DownloadIcon from "@mui/icons-material/Download";
import CheckIcon from "@mui/icons-material/Check";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ClearIcon from "@mui/icons-material/Clear";
import "./JobCaard.css";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { AuthContext } from "../../Context/AuthContext";
export default function JobCard({
  assigned,
  JobNo,
  JobId,
  proposed,
  userorder,
}) {
  const [downloading, setDownloading] = useState(false);
  const { user, userDetails, dispatch } = useContext(AuthContext);
  const [job, setJob] = useState();
  useEffect(() => {
    if (JobId) {
      console.log(JobId, "JID");
      try {
        axios
          .post(process.env.REACT_APP_SERVER_URL + "job/getJobDetails", {
            authToken: localStorage.getItem("AuthToken"),
            jobId: JobId,
          })
          .then((res) => {
            setJob(res.data);
          });
      } catch (error) {
        console.lo(error);
      }
    }
  }, [JobId]);
  const acceptorder = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "job/accept",
        {
          authToken: localStorage.getItem("AuthToken"),
          email: user.email,
          jobId: JobId,
        }
      );
      console.log(res.data.userDetails);
      dispatch({
        type: "SET_DETAILS",
        payload: { userDetails: res.data.userDetails },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const downloadDoc = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          "public/JobDocuments/" +
          job.documentName,
        { responseType: "blob" }
      );
      console.log(res);
      const file = res.data
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = "JOB_" + JobNo + ".pdf";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  const declineOrder = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "job/decline",
        {
          jobId: JobId,
          email: user.email,
          authToken: localStorage.getItem("AuthToken"),
        }
      );
      // if (res.status === 200) {
      //   let updatedUser = userDetails;
      //   updatedUser.jobsProposed = userDetails.jobsProposed.filter(
      //     (id) => id !== JobId
      //   );
      //   console.log("updated", updatedUser);
      console.log(res);
      dispatch({
        type: "SET_DETAILS",
        payload: { userDetails: res.data.userDetails },
      });
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card
        className="jobCard"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "space-between",
          width: "18rem",
          margin: "5px",
          paddingBottom: "0px",
        }}
      >
        <Card.Body style={{ height: "100%", paddingBottom: "5px" }}>
          <Card.Title>Job {JobNo}</Card.Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
            }}
          >
            <div>
              <Card.Text>
                <div>
                  <span style={{ fontWeight: "500" }}>Complete Before : </span>
                  {job?.deliveryDate?.split("T")[0]}
                </div>
                <div>
                  <span style={{ fontWeight: "500" }}>Document Size : </span>
                  {job?.documentSize} Page
                </div>
                <div>
                  <span style={{ fontWeight: "500" }}>Copies : </span>
                  {job?.numberOfCopies}
                </div>
                <div>
                  <span style={{ fontWeight: "500" }}>Size : </span>
                  {job?.sizeOfPaper}
                </div>
                <div>
                  <span style={{ fontWeight: "500" }}>Print : </span>
                  {job?.typeOfCopy}
                </div>
                <div>
                  <span style={{ fontWeight: "500" }}>Price : ₹ </span>
                  {userorder ? job?.userPrice : job?.providerPrice}
                </div>
                {job?.additionalInstruction && (
                  <div>
                    <span style={{ fontWeight: "500" }}>Note :</span>
                    {job.additionalInstruction}
                  </div>
                )}
              </Card.Text>
            </div>
          </div>
        </Card.Body>
        <div style={{ margin: "5px" }}>
          {assigned && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={downloadDoc} variant="success">
                <DownloadIcon />
                Download
              </Button>
              <Button
                variant="secondary"
                style={{ textAlign: "center", display: "flex" }}
              >
                Transfer
                <ArrowOutwardIcon sx={350} />
              </Button>
            </div>
          )}
          {proposed && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="success"
                style={{ display: "flex" }}
                onClick={acceptorder}
              >
                <CheckIcon />
                Accept
              </Button>
              <Button
                variant="danger"
                style={{ display: "flex" }}
                onClick={declineOrder}
              >
                <ClearIcon />
                Decline
              </Button>
            </div>
          )}
          {userorder && (
            <div
              style={{
                fontWeight: "500",
                textAlign: "right",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Status</span>
              <span
                style={{
                  background: "#f4e5eb",
                  // background: "red",
                  display: "flex",
                  color: "blue",
                  padding: "0px 0px 0px 4px",
                  borderRadius: "0px 25px 25px 0px",
                }}
              >
                <span>
                  {job?.status === "Finished" ? "Completed" : "Under Progress"}
                </span>
                <span
                  style={{
                    borderRadius: "0 25px 25px 0",
                    backgroundColor: "#E5D3DA",
                    padding: ".1em",
                    display: "flex",
                  }}
                >
                  {job?.status === "Finished" ? (
                    <DoneAllIcon style={{ marginLeft: "4px", color: "blue" }} />
                  ) : (
                    <PendingActionsIcon />
                  )}
                </span>
              </span>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
