import { useContext, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Table from "react-bootstrap/Table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Card from "react-bootstrap/Card";
import "./profile.css";
import CircularProgress from "@mui/material/CircularProgress";
import { LinearProgress } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
export default function ProviderProfile() {

  const {user,userDetails}=useContext(AuthContext)
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  console.log(user,"profile user")
  console.log(userDetails)

  const [smallProfileImg, setSmallProfileImg] = useState(true);
  // const userDetails = {
  //   jobsAssigned: [],
  //   jobsCompleted: [3, 4, 3],
  //   jobsProposed: [7, 5, 2],
  // };
  return (
    <>
      <NavBar />
      <Table
        striped="columns"
        responsive
        bordered
        hover
        variant="dark"
        style={{ margin: "10px auto 0px", width: "90vw" }}
      >
        <tbody>
          <tr>
            <td colSpan={2} style={{ textAlign: "center" }}>
              <img
                style={
                  smallProfileImg
                    ? { borderRadius: "50%", width: "10vw", maxWidth: "100px" }
                    : { width: "15vw", maxWidth: "150px" }
                }
                onClick={() => setSmallProfileImg(!smallProfileImg)}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=="
              />
              <div style={{textTransform:"capitalize"}}>{user?.userName}</div>
            </td>
          </tr>
          <tr>
            <td width="30%">Firm Name</td>
            <td>{userDetails?.firmName}</td>
          </tr>
          <tr>
            <td width="30%">Email</td>
            <td>{userDetails?.email}</td>
          </tr>
          <tr>
            <td width="30%">Verification Document</td>
            <td>{userDetails?.verificationDocumentType}</td>
          </tr>
          <tr>
            <td width="30%">Account</td>
            <td>{userDetails?.isVerified&&"Verified"||"Not Verified"}</td>
          </tr>
          <tr>
            <td width="30%">Phone </td>
            <td>{userDetails?.Phone}</td>
          </tr>
          <tr>
            <td width="30%">City </td>
            <td>{userDetails?.City
              }</td>
          </tr>
          <tr>
            <td width="30%">Postal Code </td>
            <td>{userDetails?.PostalCode
              }</td>
          </tr>
          <tr>
            <td width="30%">State </td>
            <td>{userDetails?.State}</td>
          </tr>
          <tr>
            <td width="30%">Country </td>
            <td>India</td>
          </tr>
          <tr>
            <td width="30%">Assigned Jobs </td>
            <td>{userDetails?.jobsAssigned?.length}</td>
          </tr>
          <tr>
            <td width="30%">Proposed Jobs </td>
            <td>{userDetails?.jobsProposed?.length}</td>
          </tr>
          <tr>
            <td width="30%">Completed Jobs </td>
            <td>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 10fr 1fr",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>{userDetails?.jobsCompleted?.length}</span>
                <LinearProgress
                  variant="determinate"
                  value={
                    userDetails?.jobsAssigned?.length > 0
                      ? (userDetails?.jobsCompleted?.length /
                          userDetails?.jobsAssigned?.length) *
                        100
                      : 100
                  }
                />
                <div className="mx-2">
                  {(userDetails?.jobsAssigned?.length > 0
                    ? (userDetails?.jobsCompleted?.length /
                        userDetails?.jobsAssigned?.length) *
                      100
                    : 100
                  ).toFixed(2)}
                  %
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td width="30%">Pending Jobs </td>
            <td>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 10fr 1fr",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>
                  {userDetails?.jobsAssigned?.length -
                    userDetails?.jobsCompleted?.length}
                </span>
                <LinearProgress
                  variant="determinate"
                  value={
                    userDetails?.jobsAssigned?.length > 0
                      ? ((userDetails?.jobsAssigned?.length -
                          userDetails?.jobsCompleted?.length) /
                          userDetails?.jobsAssigned?.length) *
                        100
                      : 0
                  }
                />
                <div className="mx-2">
                  {(userDetails?.jobsAssigned?.length > 0
                    ? ((userDetails?.jobsAssigned?.length -
                        userDetails?.jobsCompleted?.length) /
                        userDetails?.jobsAssigned?.length) *
                      100
                    : 0
                  ).toFixed(2)}
                  %
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="ProfileGrid">
        <div>
          <Card
            className="profileCard"
            border="dark"
            style={{ width: "16rem" }}
          >
            <Card.Header
              style={{
                textAlign: "center",
                fontSize: "large",
                fontWeight: "bold",
              }}
            >
              Total Assigned Jobs
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                {userDetails?.jobsAssigned?.length}
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card
            border="dark"
            className="profileCard"
            style={{ width: "16rem" }}
          >
            <Card.Header
              style={{
                textAlign: "center",
                fontSize: "large",
                fontWeight: "bold",
              }}
            >
              Proposed Jobs
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                {userDetails?.jobsProposed?.length}
              </Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card
            border="dark"
            className="profileCard"
            style={{ width: "16rem" }}
          >
            <Card.Header
              style={{
                textAlign: "center",
                fontSize: "large",
                fontWeight: "bold",
              }}
            >
              Completed Jobs
            </Card.Header>
            <Card.Body
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Card.Title>{userDetails?.jobsCompleted?.length}</Card.Title>
              <Card.Text
                style={{ position: "relative", display: "inline-flex" }}
              >
                <CircularProgress
                  variant="determinate"
                  value={
                    userDetails?.jobsAssigned?.length > 0
                      ? (userDetails?.jobsCompleted?.length /
                          userDetails?.jobsAssigned?.length) *
                        100
                      : 100
                  }
                  size="4rem"
                />
                <div
                  style={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Math.round(
                    userDetails?.jobsAssigned?.length > 0
                      ? (userDetails?.jobsCompleted?.length /
                          userDetails?.jobsAssigned?.length) *
                          100
                      : 100
                  )}
                  %
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card
            border="dark"
            className="profileCard"
            style={{ width: "16rem" }}
          >
            <Card.Header
              style={{
                textAlign: "center",
                fontSize: "large",
                fontWeight: "bold",
              }}
            >
              Pending Jobs
            </Card.Header>
            <Card.Body
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Card.Title>
                {userDetails?.jobsAssigned?.length -
                  userDetails?.jobsCompleted?.length}
              </Card.Title>
              <Card.Text
                style={{ position: "relative", display: "inline-flex" }}
              >
                <CircularProgress
                  variant="determinate"
                  value={
                    userDetails?.jobsAssigned.length > 0
                      ? ((userDetails?.jobsAssigned?.length -
                          userDetails?.jobsCompleted?.length) /
                          userDetails?.jobsAssigned?.length) *
                        100
                      : 0
                  }
                  size="4rem"
                />
                <div
                  style={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Math.round(
                    userDetails?.jobsAssigned?.length > 0
                      ? ((userDetails?.jobsAssigned?.length -
                          userDetails?.jobsCompleted?.length) /
                          userDetails?.jobsAssigned?.length) *
                          100
                      : 0
                  )}
                  %
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
