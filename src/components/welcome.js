import React, { useState, useEffect } from 'react';

const Welcome = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(username, email, password)
  }; 

  return(
    <div className="welcome">
      <h2>Welcome page</h2>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Register' : 'Click for enter'}
      </button>
      <small>{isLogin ? 'Sign up, it is free' : 'Have an account?'}</small>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
         )}     
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? 'Log in' : 'Sign up'}</button>
      </form>
    </div>
  )
}

export default Welcome;