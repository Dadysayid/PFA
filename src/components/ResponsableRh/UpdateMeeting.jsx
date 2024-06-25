import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import axios from 'axios';
import { useParams } from 'react-router';

const UpdateMeeting = () => {
  const { id } = useParams();
  const [meetingData, setMeetingData] = useState({
    title: '',
    date: '',
    time: '',
    salle: '',
    participants: [],
  });
  const [allParticipants, setAllParticipants] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  useEffect(() => {
    fetchMeetingData();
    fetchEmployeUsers();
  }, []);

  const fetchMeetingData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/meeting/${id}`);
      const data = response.data.data;
      setMeetingData({
        title: data.title,
        date: data.date,
        time: data.time,
        salle: data.salle,
        participants: data.participants,
      });
      setSelectedParticipants(data.participants.map(participant => ({
        label: participant.name + ' ' + participant.prenom + ' ' + participant.post,
        value: participant._id
      })));
    } catch (error) {
      console.error('Error fetching meeting data:', error);
    }
  };

  const fetchEmployeUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users?role=employe');
      const responseData = await response.json();
      const usersData = responseData.data;
      setAllParticipants(usersData.map(user => ({
        label: `${user.name} ${user.prenom} ${user.post}`,
        value: user._id
      })));
    } catch (error) {
      console.error('Error fetching employee users:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({ ...meetingData, [name]: value });
  };

  const handleParticipantsChange = (selectedOptions) => {
    setSelectedParticipants(selectedOptions);
    setMeetingData({ ...meetingData, participants: selectedOptions.map(option => option.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/v1/meeting/${id}`, {
        ...meetingData,
        participants: selectedParticipants.map(participant => participant.value)
      });
      alert('Meeting updated successfully.');
      window.location.href = '/dashborresponsablerh/listmeetings';
    } catch (error) {
      console.error('Error updating meeting:', error);
      alert('Error updating meeting.');
    }
  };

  return (
    <div className="card" style={{ marginTop: 40 }}>
      <div className="card-header bg-primary text-white">Edit Meeting</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={meetingData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={meetingData?.date && new Date(meetingData?.date).toISOString().split('T')[0]} // yyyy-mm-dd
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <input
              type="time"
              className="form-control"
              name="time"
              value={meetingData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Room:</label>
            <input
              type="text"
              className="form-control"
              name="salle"
              value={meetingData.salle}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Participants:</label>
            <ReactSelect
              isMulti
              options={allParticipants}
              value={selectedParticipants}
              onChange={handleParticipantsChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: 10 }}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMeeting;
