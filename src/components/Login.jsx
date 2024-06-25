import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [showPassword, setShowPassword] = useState(false);

  // const handlePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Envoyer une requête POST au backend pour l'authentification
    const response = await fetch('http://localhost:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const users = await response.json();
      localStorage.setItem("id", users.data._id);
      // Vérifier le rôle de l'utilisateur
      const role = users.data.role;
      // Rediriger en fonction du rôle
      switch (role) {
        case 'admin':
          window.location.href = '/dashboard/addemploye';
          break;
        case 'employe':
          window.location.href = '/dashbordemploye/profile';
          break;
        case 'responsablerh':
          window.location.href = '/dashborresponsablerh/profiler';
          break;
        default:
          console.log('Unknown role');
      }
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className='w-55 p-5 rounded bg-white'>
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <div className='mb-2'>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              placeholder='Enter Email' 
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="password">Password</label>
           
              <input 
                type="password"
                placeholder='Enter Password' 
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
          
          </div>
          <div className='d-grid'>
            <button type='submit' className='btn btn-primary'>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
