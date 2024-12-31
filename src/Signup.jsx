import NavBar from "./NavBar";
import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import JoblyApi from "./api.js";
import { saveUser } from "./LocalStorage";

function Signup() {
  const setUser = useContext(UserContext).setUser;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("submitted ", formData);
    JoblyApi.registerNewUser(formData)
      .then(({ token }) => {
        // console.log("submit: token: ", token);
        const userDetails = { ...formData, token };
        // console.log(userDetails);
        setUser(userDetails);
        saveUser(userDetails); // save user details in localStorage
        navigate("/");
      })
      .catch((err) => {
        console.log("error");
        setError(err[0]);
      });
  };

  return (
    <>
      <NavBar highlight="signup" />
      <h2> Signup </h2>
      <form>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="username">Username: </label>
              </td>
              <td>
                <input
                  id="username"
                  type="text"
                  placeholder="name"
                  name="username"
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password: </label>{" "}
              </td>
              <td>
                <input
                  id="password"
                  type="password"
                  placeholder="abc123"
                  name="password"
                  autoComplete="off"
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="firstname">First Name: &nbsp; &nbsp;</label>{" "}
              </td>
              <td>
                <input
                  id="firstname"
                  type="text"
                  placeholder="first name"
                  name="firstName"
                  onChange={handleChange}
                ></input>{" "}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="lastname">Last Name: </label>{" "}
              </td>
              <td>
                <input
                  id="lastname"
                  type="text"
                  placeholder="last name"
                  name="lastName"
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email: </label>{" "}
              </td>
              <td>
                <input
                  id="email"
                  type="text"
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="spacer"> </div>
        <button className="button-indent" onClick={submit}>
          Submit
        </button>
      </form>
      {error ? (
        <div className="error">
          <h4> {error} </h4>
        </div>
      ) : null}
    </>
  );
}

export default Signup;

{
  /* 
// <div className="user-input" style={{ marginLeft: "34px" }}> */
}

{
  /* <br />
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              placeholder="abc123"
              autoComplete="off"
              // value={password}
              onChange={handleChange}
            ></input>
            <br />
            <label htmlFor="firstname">First Name: </label>
            <input
              id="firstname"
              type="text"
              placeholder="first name"
              // value={password}
              onChange={handleChange}
            ></input>
            <br />
            <label htmlFor="lastname">Last Name: </label>
            <input
              id="lastname"
              type="text"
              placeholder="last name"
              // value={password}
              onChange={handleChange}
            ></input>
            <br />
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="text"
              placeholder="email"
              // value={password}
              onChange={handleChange}
            ></input>
            <br />
            <div style={{ height: "7px" }}> </div>
            <button onClick={submit}> Submit </button>
          </div> */
}
