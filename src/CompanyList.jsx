import { useState, useEffect } from "react";

import CompanyCard from "./CompanyCard";
import JoblyApi from "./api.js";
import NavBar from "./NavBar";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    JoblyApi.fetchCompanies(searchTerm).then((companies) =>
      setCompanies(companies)
    );
  }, [searchTerm]); // if searchTerm edited, go get new list of companies (incremental search) - don't wait for a submit button

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(() => e.target.value);
  };

  return (
    <>
      <NavBar highlight="companies" />
      <h2> Company List </h2>
      <form>
        <div className="list-indent">
          <label htmlFor="company-search">Search: </label>
          <input
            id="company-search"
            type="text"
            placeholder="filter-by"
            value={searchTerm}
            onChange={handleChange}
          ></input>
        </div>
      </form>
      <ul>
        {companies.map((company) => (
          <li className="companylist-li" key={company.handle}>
            <CompanyCard company={company} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CompanyList;
