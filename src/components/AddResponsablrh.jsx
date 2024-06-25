import React, { useState } from 'react';
import axios from 'axios';

import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import styles from '../foldercss/employe.module.css';

function AddResponsablrh() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [post, setPost] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      name: nom,
      prenom: prenom,
      phone: phone,
      post: post,
      password: password,
      email: email,
      role: "responsablerh" // Role changed to "responsablerh"
    }

    await axios.post("http://localhost:8000/api/v1/users", data);

    // Reset fields after submission
    setNom('');
    setPrenom('');
    setEmail('');
    setPost('');
    setPassword('');
    setPhone('');
  };

  return (
    <Container maxWidth="md" style={{backgroundColor:"white",marginTop:20}} className={styles.container}>
      <Typography variant="h4"  align="center" gutterBottom className={styles.formTitle}>
        Add Responsable RH
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name" // Changed label to "First Name"
              variant="outlined"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className={styles.inputField}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name" // Changed label to "Last Name"
              variant="outlined"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className={styles.inputField}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Position" // Changed label to "Position"
              variant="outlined"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              className={styles.inputField}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone" // Changed label to "Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.inputField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email" // Changed label to "Email"
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
              label="Password" // Changed label to "Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Button style={{marginBottom:10}} fullWidth variant="contained" color="primary" type="submit" className={styles.submitButton}>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddResponsablrh;
