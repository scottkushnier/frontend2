import { useState, useContext } from "react";

import UserContext from "./UserContext";
import JoblyApi from "./api.js";

function clickOnJobId(id, user, token) {
  JoblyApi.registerJobApply(user.username, id, token);
  if (user.applications) {
    user.applications.push(id);
  } else {
    user.applications = [id];
  }
  // console.log("user now: ", user);
  // don't need to update localStorage here,
  // user appl. details re-read on job listing pages
}

function ApplyButton({ jobid, applied }) {
  const [clicked, setClicked] = useState(applied);
  const user = useContext(UserContext).user;
  if (!clicked) {
    return (
      <button
        className="applyButton"
        onClick={() => {
          clickOnJobId(jobid, user, user.token);
          setClicked(true);
        }}
      >
        Apply
      </button>
    );
  } else {
    return <button className="applyButton applied">Applied</button>;
  }
}

export default ApplyButton;
