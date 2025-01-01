import NavBar from "./NavBar";
import { useState, useContext } from "react";

import UserContext from "./UserContext";
import JoblyApi from "./api.js";
import { saveUser } from "./LocalStorage";

function Profile() {
  let user = useContext(UserContext).user;
  const setUser = useContext(UserContext).setUser;
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    // console.log("tgt: ", e.target.name, e.target.value, "data: ", formData);
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
    setMessage("");
  };

  const submit = (e) => {
    e.preventDefault();
    user = { ...user, ...formData }; // merge new changes into user details & save back into context
    saveUser(user); // save new profile info in localStorage too
    setUser(user);
    JoblyApi.modUserProfile(user.username, user.token, formData);
    setMessage("Submitted.");
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };
  return (
    <>
      <NavBar highlight="profile" />
      <h2> Profile </h2>
      <form>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="username">Username: </label>
              </td>
              <td>
                <input
                  className="readonly"
                  readOnly={true}
                  id="username"
                  type="text"
                  placeholder="name"
                  name="username"
                  value={user.username}
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
                  value={formData.firstName}
                  onChange={handleChange}
                ></input>
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
                  value={formData.lastName}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email: </label>
              </td>
              <td>
                <input
                  id="email"
                  type="text"
                  placeholder="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="submit-button" onClick={submit}>
          Submit
        </button>
      </form>
      {message ? (
        <div className="message">
          <h4> {message} </h4>
        </div>
      ) : null}
    </>
  );
}

export default Profile;
