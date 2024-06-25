import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import axios from 'axios';

const AddMeeting = () => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [room, setRoom] = useState('');
  const [participants, setParticipants] = useState([]);
  const [allParticipants, setAllParticipants] = useState([]);
  const [employeUsers, setEmployeUsers] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newMeeting = {
        date,
        title,
        time,
        salle: room,
        participants: participants.map(participant => participant.value)
      };
      
      const response = await axios.post('http://localhost:8000/api/v1/meeting', newMeeting);
      alert('Meeting successfully created!');
      
      setDate('');
      setTitle('');
      setTime('');
      setRoom('');
      setParticipants([]);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message.includes('user have already meeting in this time and date')) {
          alert('One of the participants already has a meeting at this time and date.');
        } else {
          alert(error.response.data.message);
        }
      } else {
        alert('one of employe have already meeting in this time and date');
      }
      console.error('one of employe have already meeting in this time and date :', error);
    }
  };

  useEffect(() => {
    fetchEmployeUsers();
  }, []);

  const fetchEmployeUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users?role=employe');
      const responseData = await response.json();
      const usersData = responseData.data;
      setAllParticipants(usersData.map(user => ({
        label: `${user.name} ${user.prenom} ${user.post}`,
        value: user._id
      })));
      setEmployeUsers(usersData);
    } catch (error) {
      console.error('Error fetching employee users:', error);
    }
  };

  return (
    <div className="card" style={{ marginTop: 30 }}>
      <div className="card-header bg-primary text-white">Add Meeting</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date :</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Time :</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Room :</label>
            <input
              type="text"
              className="form-control"
              value={room}
              onChange={(event) => setRoom(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Participants :</label>
            <ReactSelect
              isMulti
              options={allParticipants}
              value={participants}
              onChange={(selectedOptions) => setParticipants(selectedOptions)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: 10 }}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddMeeting;
