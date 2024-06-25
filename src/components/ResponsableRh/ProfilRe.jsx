import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { storage_path } from "../../config";
import img from "../../assest/profile.png"

function ProfileEm() {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/${userId}`);
      const userData = await response.json();
      setUserData(userData.data);
      console.log(userData.data.profileImg)
      // userData.data.profileImg && setProfileImg(userData.data.profileImg)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    if (!profileImg) {
      console.error("Please select a profile image.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImg", profileImg);
    formData.append("userData", JSON.stringify(userData));

    try {
      // Send the image to /api/v1/users/:id/uploadUserImage
      await fetch(`http://localhost:8000/api/v1/users/${userId}/uploadUserImage`, {
        method: 'POST',
        body: formData,
      });

      // Send updated user data to /api/v1/users/:id
      const userDataResponse = await fetch(`http://localhost:8000/api/v1/users/${userId}`, {
        method: "PUT",
        body: formData,
      });

      const updatedUserData = await userDataResponse.json();
      setUserData(updatedUserData.data);
      setEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setProfileImg(e.target.files[0]);
    } else {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    }
  };

  return (
    <Card style={{ marginTop: 40 }}>
      <Card.Header className="bg-primary text-white">Personal Information</Card.Header>
      <Card.Body>
        <div className="row">
          <div className="col-md-4 text-center">
            <Form.Group controlId="formProfileImg">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                id="custom-file"
                type="file"
                label="Choose an image"
                custom="true"
                onChange={handleChange}
                name="profileImg"
              />
              {profileImg && (
                <div className="mt-3">
                  <img
                    src={URL.createObjectURL(profileImg)}
                    alt="Profile"
                    className="rounded-circle img-thumbnail"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              {!profileImg && userData && userData.profileImg && (
                <div className="mt-3">
                  <img
                    src={storage_path + userData.profileImg}
                    alt="Profile"
                    className="rounded-circle img-thumbnail"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </Form.Group>
            <Button style={{ marginTop: 10 }} variant="success" onClick={handleSave} disabled={!profileImg}>
              Save
            </Button>
          </div>
          <div className="col-md-4" style={{ marginLeft: 70 }}>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label> First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={userData?.name || ''}
                  readOnly={!editing}
                  onChange={handleChange}
                  name="name"
                />
              </Form.Group>
              <Form.Group controlId="formPrenom">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={userData?.prenom || ''}
                  readOnly={!editing}
                  onChange={handleChange}
                  name="prenom"
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  value={userData?.email || ''}
                  readOnly={!editing}
                  onChange={handleChange}
                  name="email"
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter password"
                  value={userData?.password || ''}
                  readOnly={!editing}
                  onChange={handleChange}
                  name="password"
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone"
                  value={userData?.phone || ''}
                  readOnly={!editing}
                  onChange={handleChange}
                  name="phone"
                />
              </Form.Group>
              {editing ? (
                <Button style={{ marginTop: 10 }} variant="success" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button style={{ marginTop: 10 }} variant="primary" onClick={handleEdit}>
                  Edit
                </Button>
              )}
            </Form>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileEm;
