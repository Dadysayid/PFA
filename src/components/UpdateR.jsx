import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateR() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    name: '',
    prenom: '',
    email: '',
    phone: '',
    password: '' // Ajout du champ pour le mot de passe
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/${userId}`);
      const responseData = await response.json();
      const user = responseData.data;
      setUserData(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8000/api/v1/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      // Redirect to the list page after successful update
      window.location.href = '/dashboard/listResponsablerh';
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container" style={{ marginTop: 20 }}>
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "#007bff" }}>Edit ResponsableRh</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ flex: '1 1 45%' }}>
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="prenom"
                  value={userData.prenom}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <label>Password</label>
                <input
                  type="text"
                  className="form-control"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateR;
