import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import axios from 'axios';
import styles from '../foldercss/employe.module.css'; // Import custom styles

function AddEmployee() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [post, setPost] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      name: nom,
      prenom: prenom,
      phone: phone,
      post: post,
      password: password,
      email: email,
      role: "employe"
    }

    try {
      await axios.post("http://localhost:8000/api/v1/users", data);
      // Reset fields after submission
      setNom('');
      setPrenom('');
      setEmail('');
      setPost('');
      setPassword('');
      setPhone('');
      setRole('');
      alert("Employee added successfully!");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("An error occurred while adding employee.");
    }
  };

  return (
    <Container maxWidth="md" style={{backgroundColor:"white",marginTop:20}} className={styles.container}>
      <Typography variant="h4"  align="center" gutterBottom className={styles.formTitle}>
        Add Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className={styles.inputField}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className={styles.inputField}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Position"
              variant="outlined"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              className={styles.inputField}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.inputField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Button  fullWidth style={{marginBottom:10}}  variant="contained" color="primary" type="submit" className={styles.submitButton}>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddEmployee;
