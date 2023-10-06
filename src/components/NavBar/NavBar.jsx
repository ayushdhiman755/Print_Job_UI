import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
function NavBar({ user }) {
  const currentRoute = window.location.href.toLowerCase();
  const logOut = () => {
    localStorage.removeItem("AuthToken");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="px-3 bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
      activeClassName="active"
    >
      <Navbar.Brand>Print Job</Navbar.Brand>
      {!user && (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link
                className={
                  currentRoute.includes("profile")
                    ? "tab active"
                    : "tab" + " NavLink"
                }
                to="/profile"
              >
                My Profile
              </Link>
              <Link
                className={
                  currentRoute.includes("assignedjobs")
                    ? "tab active"
                    : "tab" + " NavLink"
                }
                to="/assignedJobs"
              >
                Assigned Jobs
              </Link>
              <Link
                className={
                  currentRoute.includes("proposedjobs")
                    ? "tab active"
                    : "tab" + " NavLink"
                }
                to="/proposedJobs"
              >
                Proposed Jobs
              </Link>
            </Nav>
            <Nav>
              <Link className="NavLink" to="/signUp">
                <div
                  // style={{ cursor: "pointer" }}
                  onClick={logOut}
                >
                  Log Out
                  <LogoutIcon className="ms-2" sx={200} />
                </div>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
      {user && (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link
                className={
                  currentRoute.includes("userProfile")
                    ? "tab active"
                    : "tab" + " NavLink"
                }
                to="/userProfile"
              >
                My Profile
              </Link>
              <Link
                className={
                  currentRoute.includes("MyOrders")
                    ? "tab active"
                    : "tab" + " NavLink"
                }
                to="/MyOrders"
              >
                My Orders
              </Link>
              <Link
                className={
                  currentRoute.includes("createJob")
                    ? "tab active"
                    : "tab" + " NavLink"
                }
                to="/createJob"
              >
                New Order
              </Link>
            </Nav>
            <Nav>
              <Link className="NavLink" to="/signUp">
                <span onClick={logOut}>Log Out</span>
                <LogoutIcon className="ms-2" sx={200} />
              </Link>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
}

export default NavBar;
