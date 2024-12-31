import { useContext } from "react";

import UserContext from "./UserContext";
import NavBar from "./NavBar";

function Home() {
  let user = useContext(UserContext).user;
  if (user) {
    return (
      <>
        <NavBar highlight="home" />
        <h2> Jobly! </h2>
        <h4>
          Welcome, {user.firstName} {user.lastName}.
        </h4>
      </>
    );
  } else {
    return (
      <>
        <NavBar highlight="home" />
        <h2> Welcome to Jobly! </h2>
      </>
    );
  }
}

export default Home;
