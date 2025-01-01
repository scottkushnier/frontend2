import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import JoblyApi from "./api.js";
import UserContext from "./UserContext";
import { saveUser } from "./LocalStorage";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  // might be nice to enhance with timer to remove error message after being displayed for maybe 15 sec.
  const navigate = useNavigate();
  const setUser = useContext(UserContext).setUser;

  const handleChangeUsername = (e) => {
    e.preventDefault();
    setUsername(() => e.target.value);
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(() => e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    setMsg("working ...");
    setError("");
    // console.log("submitted ", username, " ", password);
    JoblyApi.fetchToken(username, password) // checks password here, error catched below if no good
      .then((ret) => {
        // console.log("submit: token: ", ret);
        const token = ret.token;
        JoblyApi.fetchUser(username, token).then((ret) => {
          // pw good -> get all user details & go to home page
          const userDetails = { ...ret.user, token };
          setUser(userDetails);
          saveUser(userDetails); // save user data in localStorage
          navigate("/");
        });
      })
      .catch((err) => {
        // console.log("error");
        setMsg("");
        setError(err[0]);
        setTimeout(() => {
          // remove error msg after a time
          setError("");
        }, 5000);
      });
  };

  return (
    <>
      <NavBar highlight="login" />
      <h2> Login </h2>
      <form>
        <div className="user-input indent">
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            placeholder="name"
            value={username}
            onChange={handleChangeUsername}
          ></input>
          <br />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            placeholder="abc123"
            autoComplete="off"
            value={password}
            onChange={handleChangePassword}
          ></input>
          <br />
          <button className="login-button" onClick={submit}>
            Submit
          </button>
          {error ? (
            <div className="error">
              <h4> {error} </h4>
            </div>
          ) : null}
          {msg ? (
            <div className="message">
              <h4> {msg} </h4>
            </div>
          ) : null}
        </div>
      </form>
    </>
  );
}

export default Login;
