import React, { useState } from 'react';
import axios from 'axios';

const DemandVacation = () => {
  const [period, setPeriod] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vacationType, setVacationType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "period") {
      setPeriod(value);
    } else if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const handleTypeChange = (e) => {
    setVacationType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const employeeId = localStorage.getItem("id");

      const response = await axios.post('http://localhost:8000/api/v1/vact', {
        periode: period,
        strtdate: startDate,
        enddate: endDate,
        typevaction: vacationType,
        employee: employeeId
      });

      console.log('API Response:', response.data);
      // Show success alert
      window.alert('Vacation request submitted successfully!');
      
      // Reset form fields after successful submission
      setPeriod('');
      setStartDate('');
      setEndDate('');
      setVacationType('');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Show error alert
      window.alert('Error submitting vacation request. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary">
          <h2>Vacation Request</h2>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group row" style={{ margin: "2px" }}>
              <label htmlFor="startDate" className="col-sm-4 col-form-label text-right">Start Date:</label>
              <div className="col-sm-8">
                <input type="date" name="startDate" value={startDate} onChange={handleInputChange} className="form-control" />
              </div>
            </div>
            <div className="form-group row" style={{ margin: "2px" }}>
              <label htmlFor="endDate" className="col-sm-4 col-form-label text-right">End Date:</label>
              <div className="col-sm-8">
                <input type="date" name="endDate" value={endDate} onChange={handleInputChange} className="form-control" />
              </div>
            </div>
            <div className="form-group row" style={{ margin: "2px" }}>
              <label htmlFor="period" className="col-sm-4 col-form-label text-right">Periode:</label>
              <div className="col-sm-8">
                <input type="number" name="period" value={period} onChange={handleInputChange} className="form-control" />
              </div>
            </div>
            <div className="form-group row" style={{ margin: "2px" }}>
              <label htmlFor="vacationType" className="col-sm-4 col-form-label text-right">Vacation Type:</label>
              <div className="col-sm-8">
                <select name="vacationType" value={vacationType} onChange={handleTypeChange} className="form-control">
                  <option value="">Select vacation type</option>
                  <option value="without pay vacation">without pay vacation</option>
                  <option value="annual vacation">Annual vacation</option>
                  <option value="sick vacation">sick vacation</option>
                </select>
              </div>
            </div>
            <div className="form-group row mt-3">
              <div className="col-sm-8 offset-sm-4">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DemandVacation;
