import React from 'react';

import { useLoginHook } from './hooks/LoginHook';

const LoginForm: React.FC = () => {
  const { handleLogin, errors, register } = useLoginHook();

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input {...register('username')} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
