import JobCard from "./JobCard";
import { useState, useEffect } from "react";
import JoblyApi from "./api.js";
import NavBar from "./NavBar";
import UserContext from "./UserContext";
import { useContext } from "react";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [justApplied, setJustApplied] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState(null);
  const user = useContext(UserContext).user;
  useEffect(() => {
    // get all jobs
    JoblyApi.fetchJobs(searchTerm).then((jobs) => setJobs(jobs));
  }, [searchTerm]);
  useEffect(() => {
    // get all jobs (ids only) this user has applied to
    JoblyApi.fetchUser(user.username, user.token).then(({ user }) => {
      setAppliedJobIds(() => user.applications);
    });
  }, [justApplied, user]); // figure out which jobs were applied to again - if user checks "just applied jobs" box

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(() => e.target.value);
  };

  const handleCheck = () => {
    // check toggled - on only show applied-to jobs
    setJustApplied(!justApplied);
  };

  if (appliedJobIds) {
    // if got list & ready to show, ow say "working..."
    return (
      <>
        <NavBar highlight="jobs" />
        <h2> Job List </h2>
        <form>
          <div className="list-indent">
            <label htmlFor="job-search">Search: </label>
            <input
              id="job-search"
              type="text"
              placeholder="filter-by"
              value={searchTerm}
              onChange={handleChange}
            ></input>
            <div className="horz-spacer"></div>
            <input
              id="justapplied"
              type="checkbox"
              value={justApplied}
              onChange={handleCheck}
            ></input>
            <label htmlFor="justapplied"> Show only if applied </label>
          </div>
        </form>
        <ul className="joblist-ul">
          {justApplied
            ? jobs.map((job) => {
                if (appliedJobIds.includes(job.id)) {
                  return (
                    <li className="joblist-li" key={job.id}>
                      <JobCard job={job} showCompany="true" applied={true} />
                    </li>
                  );
                } else {
                  return null;
                }
              })
            : jobs.map((job) => {
                const applied = appliedJobIds.includes(job.id);
                return (
                  <li className="joblist-li" key={job.id}>
                    <JobCard job={job} showCompany="true" applied={applied} />
                  </li>
                );
              })}
        </ul>
      </>
    );
  } else {
    return <h2> Working... </h2>;
  }
}

export default JobList;
