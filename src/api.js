import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://192.168.5.129:3001";
// const BASE_URL = "http://192.168.5.129:3001";

// async function delay(secs) {
//   return new Promise((res) => {
//     setTimeout(res, secs * 1000);
//   });
// }

class JoblyApi {
  static async request(endpoint, token = null, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};
    try {
      if (token) {
        // put token, if needed, into header info
        const headers = { Authorization: `Bearer ${token}` };
        return (await axios({ url, method, data, params, headers })).data;
      } else {
        return (await axios({ url, method, data, params })).data;
      }
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async fetchCompanies(nameFilter = "") {
    const data = nameFilter ? { name: nameFilter } : null;
    const res = await this.request("companies", null, data);
    return res.companies;
  }

  static async fetchJobs(titleFilter = "") {
    const data = titleFilter ? { title: titleFilter } : null;
    const res = await this.request("jobs", null, data);
    return res.jobs;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async fetchUser(username, token) {
    // await delay(5);
    const userDetails = await this.request(`users/${username}`, token);
    // console.log(userDetails);
    return userDetails;
  }

  static async fetchToken(username, password) {
    // console.log("fetch token: ", username, password);
    const token = await this.request(
      "auth/token",
      null,
      { username, password },
      "post"
    );
    // console.log("token: ", token);
    return token;
  }

  static async registerNewUser(userDetails) {
    // console.log("register: ", userDetails);
    const token = await this.request(
      "auth/register",
      null,
      userDetails,
      "post"
    );
    return token;
  }

  static async registerJobApply(username, jobid, token) {
    const result = await this.request(
      `users/${username}/jobs/${jobid}`,
      token,
      null,
      "post"
    );
    return result;
  }

  static async modUserProfile(username, token, data) {
    // console.log("patch ", username, token, data);
    const result = await this.request(
      `users/${username}`,
      token,
      data,
      "patch"
    );
    return result;
  }
}

// token will be stored with rest of user parameters, firstName, email, etc. in App state variable & in localStorage

// from original distribution:
//      for now, put token ("testuser" / "password" on class)
//      JoblyApi.token =
//        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//        "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//        "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
