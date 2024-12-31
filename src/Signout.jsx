import { useContext, useEffect } from "react";

import Home from "./Home";
import UserContext from "./UserContext";
import { clearUser } from "./LocalStorage";

function Signout() {
  clearUser();
  const setUser = useContext(UserContext).setUser;
  // why useEffect necessary here? - don't know, but works now
  useEffect(() => {
    setUser(() => "");
  }, []);
  return <Home />;
}

export default Signout;
