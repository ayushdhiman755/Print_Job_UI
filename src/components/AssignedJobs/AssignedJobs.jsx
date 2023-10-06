import React, { useContext, useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import JobCard from "../jobCard/JobCard";
import { Container } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";

export default function AssignedJobs() {
  const { userDetails } = useContext(AuthContext);
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    setJobList(userDetails?.jobsAssigned);
  }, [userDetails]);

  return (
    <>
      <NavBar />
      <Container
        style={{
          display: "grid",
          gridTemplateColumns: " repeat(auto-fit, minmax(300px, 1fr))",
          justifyItems: "center",
        }}
      >
        {jobList?.length === 0 && (
          <h1>Once You Get A Job They Will Be Shown Here</h1>
        )}
        {jobList?.map((job, i) => (
          <JobCard assigned JobId={job} key={job} JobNo={i+1} />
        ))}
      </Container>
    </>
  );
}
