import ApplyButton from "./ApplyButton";

// if a list of all jobs for a particular,
// .. then don't need to repeat company on each card
// whether job as been applied to is passed down to Apply button element
function JobCard({ job, showCompany, applied }) {
  return (
    <div className="container">
      <div className="card jobcard">
        <ul>
          <li> {job.title} </li>
          {showCompany ? (
            <li className="description">Company: {job.companyName} </li>
          ) : (
            <></>
          )}
          {job.salary ? (
            <li className="description"> Salary: {job.salary} </li>
          ) : (
            <></>
          )}
          {job.equity && job.equity > 0 ? (
            <li className="description"> Equity: {job.equity} </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <ApplyButton jobid={job.id} applied={applied} />
    </div>
  );
}

export default JobCard;
