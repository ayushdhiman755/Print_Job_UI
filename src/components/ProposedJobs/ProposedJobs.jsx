import React, { useContext, useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Container } from "@mui/material";
import JobCard from "../jobCard/JobCard";
import { AuthContext } from "../../Context/AuthContext";
export default function ProposedJobs() {
  const { userDetails } = useContext(AuthContext);
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    setJobList(userDetails?.jobsProposed);
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
        {" "}
        {jobList?.length === 0 && (
          <h1>The Jobs Proposed To You Will Be Shown Here </h1>
        )}
        {jobList?.map((job, i) => (
          <JobCard proposed key={i} JobId={job} JobNo={i+1} />
        ))}
      </Container>
    </>
  );
}
