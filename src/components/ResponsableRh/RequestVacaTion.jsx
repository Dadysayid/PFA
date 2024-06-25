import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestVacation = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/vact");
        setRequests(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRequests();
  }, []);



  const handleAccept = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/vact/${id}`,
        { status: true }
      );
      const updatedRequests = requests.map((request) => {
        if (request._id === id) {
          return { ...request, status: true };
        }
        return request;
      });
      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error while accepting request:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/vact/${id}`,
        { status: false }
      );
      const updatedRequests = requests.map((request) => {
        if (request._id === id) {
          return { ...request, status: false };
        }
        return request;
      });
      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error while rejecting request:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary"  >
          <h2>List of Vacation Requests</h2>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <table className="table">
            <thead>
              <tr>
                <th>First&Last Name</th>
                <th>Start Date</th>
                <th>Period</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>
                    {request.employee.name} {request.employee.prenom}
                  </td>
                  <td>
                    {new Date(request.strtdate).toLocaleDateString()}
                  </td>
                  <td>{request.periode}</td>
                  <td>{request.typevaction}</td>
                  <td>
                    {!request.hasOwnProperty('status') && (
                      <>
                        <i
                          onClick={() => handleAccept(request._id)}
                          className="bi bi-check-lg text-success mr-2"
                          style={{ cursor: "pointer" }}
                        ></i>
                        <i
                          onClick={() => handleReject(request._id)}
                          className="bi bi-x-circle text-danger"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestVacation;
