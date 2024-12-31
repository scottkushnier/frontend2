function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
  //   console.log("user saved");
}

function retrieveUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
}

function clearUser() {
  localStorage.removeItem("user");
}

export { saveUser, retrieveUser, clearUser };
