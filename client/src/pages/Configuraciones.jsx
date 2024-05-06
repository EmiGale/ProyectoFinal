import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  // Define estados para los valores del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telegramId, setTelegramId] = useState('');

  return (
    <div className="flexbox-item flexbox-main">
      <form  id="register_fields">
        <label htmlFor="username">Username:</label>
        <br />
        <input type="text" name="username" id="" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input type="password" name="password" id="" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label htmlFor="conf_password">Confirm password:</label>
        <br />
        <input type="password" name="conf_password" id="" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <br />
        <label htmlFor="telegram">Telegram ID:</label>
        <br />
        <input type="text" name="telegramid" id="" value={telegramId} onChange={(e) => setTelegramId(e.target.value)} />
        <br />
        <p id="login_prompt">
          Already have an account?{' '}
          <Link to="/login" id="login_link">
            Log in
          </Link>
        </p>
        <button type="submit" className="button-30">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;