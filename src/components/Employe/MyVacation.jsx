import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyVacation = () => {
  const [vacationData, setVacationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer l'ID de l'employé connecté depuis localStorage
        const employeeId = localStorage.getItem('id');

        // Vérifier si l'ID de l'employé est disponible
        if (employeeId) {
          const response = await axios.get(`http://localhost:8000/api/v1/vact/my-vacations?employee=${employeeId}`);
          setVacationData(response.data);
        } else {
          throw new Error('Employee ID not found in local storage.');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4" >My Vacations</h2>
      <table className="table">
        <thead>
          <tr>
            <th className='bg-primary'>Period</th>
            <th className='bg-primary'>Start Date</th>
            <th className='bg-primary'>End Date</th>
            <th className='bg-primary'>Vacation Type</th>
            <th className='bg-primary'>Status</th>
          </tr>
        </thead>
        <tbody>
          {vacationData.map((vacation, index) => (
            <tr key={index}>
              <td>{vacation.periode}</td>
              <td>{new Date(vacation.strtdate).toLocaleDateString()}</td>
              <td>{new Date(vacation.enddate).toLocaleDateString()}</td>
              <td>{vacation.typevaction}</td>
              <td>{vacation.status == null ? 'Waiting' : (vacation.status == true ? 'Accepted' : 'Rejected')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyVacation;
