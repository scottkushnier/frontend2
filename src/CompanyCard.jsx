import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  return (
    <Link to={company.handle}>
      <div className="card companycard">
        <ul>
          <li> {company.name} </li>
          <li className="description">{company.description}</li>
        </ul>
      </div>
    </Link>
  );
}

export default CompanyCard;
