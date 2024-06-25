import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ListMeeting = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/meeting');
      setMeetings(response.data.data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const handleDelete = async (meetingId) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/meeting/${meetingId}`);
        alert('Meeting successfully deleted.');
        setMeetings(meetings.filter(meeting => meeting._id !== meetingId));
      } catch (error) {
        console.error('Error deleting the meeting:', error);
        alert('Error deleting the meeting.');
      }
    }
  };

  return (
    <div className="card" style={{ marginTop: 40 }}>
      <div className="card-header bg-primary text-white">Meeting List</div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Time</th>
              <th>Room</th>
              <th>Participants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting._id}>
                <td>{new Date(meeting.date).toLocaleDateString()}</td>
                <td>{meeting.title}</td>
                <td>{meeting.time}</td>
                <td>{meeting.salle}</td>
                <td>
                  {meeting.participants.map((res, index) => (
                    <span key={index}>
                      <strong style={{ fontSize: "10px" }}>
                        {res.name} {res.prenom} {res.post}
                      </strong>
                      {index !== meeting.participants.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td>
                  <Link to={`/dashborresponsablerh/updatemeeting/${meeting._id}`}>
                    <EditIcon
                      aria-hidden="false"
                      className="edit"
                      aria-label="Edit"
                      style={{ cursor: 'pointer', marginRight: 10 }}
                    />
                  </Link>
                  <Link onClick={() => handleDelete(meeting._id)}>
                    <DeleteIcon
                      aria-hidden="false"
                      className="delete"
                      aria-label="Delete"
                      style={{ cursor: 'pointer' }}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListMeeting;
