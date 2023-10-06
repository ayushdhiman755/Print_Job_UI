import React, { useContext, useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Container } from "@mui/material";
import JobCard from "../jobCard/JobCard";
import { AuthContext } from "../../Context/AuthContext";

export default function UserOrders() {
  const { userDetails } = useContext(AuthContext);
  const [jobList, setJObList] = useState([]);
  useEffect(() => {
    console.log(userDetails, "uo");
    setJObList(userDetails?.jobs);
    console.log(userDetails?.jobs,"JOBS")
  }, [userDetails]);
  return (
    <>
      <NavBar user />
      <Container
        style={{
          display: "grid",
          gridTemplateColumns: " repeat(auto-fit, minmax(300px, 1fr))",
          justifyItems: "center",
        }}
      >
        {jobList?.map((job, i) => {
          console.log(job, "JOB", i, "i");
          return <JobCard key={job} JobId={job} JobNo={i+1} userorder />;
        })}
        {jobList?.length === 0 && <h1>Your Orders will be shown here</h1>}
      </Container>
    </>
  );
}
