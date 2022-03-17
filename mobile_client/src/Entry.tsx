import App from './App';
import React from 'react';
import { UserService } from './service/userService';

const userService = new UserService();

export default () => {
  return <App userService={userService} />;
};
