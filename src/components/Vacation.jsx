import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../foldercss/Vaction.module.css"
const Vacation = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/vact/vacation?page=${page}`);
        setRequests(response.data.vacation);
        // Assuming you have a header in the response indicating the total number of pages
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRequests();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header  bg-primary" >
          <h2>Vacation Requests</h2>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <table className="table">
            <thead>
              <tr>
                <th>First & Last Name</th>
                <th>Start Date</th>
                <th>Period</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>
                    {request.employee && request.employee.name}{" "}
                    {request.employee && request.employee.prenom}
                  </td>
                  <td>{new Date(request.strtdate).toLocaleDateString()}</td>
                  <td>{request.periode}</td>
                  <td>{request.typevaction}</td>
                  <td>
                    {request.status === true
                      ? "Accepted"
                      : request.status === false
                      ? "Rejected"
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={style.pagination} >
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
     
          <span>{page}</span> / <span>{totalPages}</span>
          <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Vacation;
