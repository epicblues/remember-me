import axios from 'axios';

export class UserService {
  name?: string;

  async login(name: string, password: string) {
    const { data } = await axios.post('http://localhost:5000/user/login', {
      name,
      password,
    });
    this.name = name;
    console.log(data);

    return data;
  }

  async logout() {
    axios.get('http://localhost:5000/user/logout');
    this.name = undefined;
  }

  constructor() {
    console.log('userservice constructed');
  }
}
