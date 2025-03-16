import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock login check (username and password are fixed for test)
    if (username === 'testuser' && password === 'TestPass123') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <h1>Welcome, {username}</h1>
      )}
    </div>
  );
}

export default App;
