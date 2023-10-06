import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ProviderDashBoard from "../../components/ProviderDashBoard/ProviderDashBoard";
import ProviderDetails from "../../components/ProviderDetails/ProviderDetails";
import UserDashBoard from "../../components/UserDashBoard/UserDashBoard";
import UserDetailsForm from "../../components/UserDetails/UserDetailsForm";
export default function Home() {
  const { user, userDetails: currentUserAllDetails } = useContext(AuthContext);
  console.log(currentUserAllDetails, "allDetails");
  console.log(user, "userdetails");
  return (
    <>
      {user?.type === "User" &&
        (user?.otherDetails ? <UserDashBoard /> : <UserDetailsForm />)}
      {user?.type === "Provider" &&
        (user?.otherDetails ? <ProviderDashBoard /> : <ProviderDetails />)}
    </>
  );
}
