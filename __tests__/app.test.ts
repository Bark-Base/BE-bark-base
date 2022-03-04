import { pool } from '../lib/utils/pool';
import { setup } from '../data/setup';
import  request  from 'supertest';
import UserService from '../lib/services/UserService';
const app = require('../lib/app');
const mockUser = { email: 'test@user', password: '123' };
const mockUser2 = { email: 'test@user2', password: '123' };
const registerAndLogin = async (userProps:any = {}) => {
  const password = userProps.password ?? mockUser.password;
  
  // agent dependency allows the storage of cookies for tests
  const agent:any = request.agent(app);
  
  // Call create user method
  const user = await UserService.create({ ...mockUser, ...userProps });
  
  // after user creation this signs into the page
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('user auth routes',  () => {
  beforeAll(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('tests the signup route', async () => {
    const res = await request(app).post('/api/v1/auth').send(mockUser2);
    expect(res.body).toEqual({
        
      message: 'Signed in successfully!',
      user: {
        ownerId: expect.any(String),
        email: 'test@user2'
      }
        
    });
    
  });
  it('should return a 401 when signed out and trying to view user', async () => {
    const res = await request(app).get('/api/v1/auth/user');
    expect(res.text).toMatchSnapshot();
  });

  // it('should create a pet', async () => {
    
  //   const [ user] = await registerAndLogin({ email:'test@user'});
  //   const check:any = await request(app).post('/api/v1/pet/').send({ownerId:'2', name:'bubba', birthday:'123', imageUrl:''}); 
    
  //   console.log(user, check.body);
  //   const res = await request(app).get(`/api/v1/pet/all/2`)

  //   expect(res.body).toEqual([{ ownerId: expect.any(String), }]);
  // });

});
