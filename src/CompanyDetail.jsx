import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api.js";
import JobCard from "./JobCard";
import NavBar from "./NavBar";
import UserContext from "./UserContext";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(null);
  const user = useContext(UserContext).user;

  useEffect(() => {
    JoblyApi.getCompany(handle).then((company) => setCompany(company));
    JoblyApi.fetchUser(user.username, user.token).then(({ user }) => {
      // console.log("appls: ", user.applications);
      setAppliedJobs(() => user.applications);
    });
  }, []);

  if (company && appliedJobs) {
    return (
      <>
        <NavBar />
        <h2> {company.name} </h2>
        <ul>
          <li> "{company.description}"</li>
          <li> Employees: {company.numEmployees} </li>
        </ul>
        {company.jobs ? (
          <ul className="joblist-ul">
            {company.jobs.map((job) => {
              const applied = appliedJobs.includes(job.id);
              // if (applied) {
              //   console.log("already applied to ", job.id);
              // }
              return (
                <li className="joblist-li" key={job.id}>
                  <JobCard job={job} applied={applied} />
                </li>
              );
            })}
          </ul>
        ) : (
          <></>
        )}
      </>
    );
  } else {
    return "Working...";
  }
}

export default CompanyDetail;
