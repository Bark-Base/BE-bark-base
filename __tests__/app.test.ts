import { pool } from '../lib/utils/pool';
import { setup } from '../data/setup';
import request from 'supertest';
import UserService from '../lib/services/UserService';
const app = require('../lib/app');
const mockUser = { email: 'test@user', password: '123' };
const mockUser2 = { email: 'test@user2', password: '123' };

const registerAndLogin = async (userProps: any = {}) => {
  const password = userProps.password ?? mockUser.password;

  // agent dependency allows the storage of cookies for tests
  const agent: any = request.agent(app);

  // Call create user method
  const user = await UserService.create({ ...mockUser, ...userProps });

  // after user creation this signs into the page
  const { email } = user;
  await agent.post('/api/v1/auth/session').send({ email, password });
  return [agent, user];
};

describe('user auth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('tests the signup route', async () => {
    const res = await request(app).post('/api/v1/auth').send(mockUser);
    expect(res.body).toEqual({
      message: 'Signed in successfully!',
      user: {
        ownerId: expect.any(String),
        email: 'test@user',
      },
    });
  });

  it('should return a 401 when signed out and trying to view user', async () => {
    const res = await request(app).get('/api/v1/auth/user');
    expect(res.status).toEqual(401);
  });

  it('should create a pet', async () => {
    const [agent, user] = await registerAndLogin({ ...mockUser });
    await agent
      .post('/api/v1/pet/')
      .send({ ownerId: '2', name: 'bubba', birthday: '123', imageUrl: '' });
    // gets all pets by ownerId v
    const res = await agent.get(`/api/v1/pet/4`);

    expect(res.body).toEqual({
      ownerId: expect.any(String),
      name: 'bubba',
      birthday: '123',
      imageUrl: '',
      petId: expect.any(String),
      contacts: [null],
      medical: [null],
    });
  });

  it('should create then update a pet', async () => {
    const [agent, user] = await registerAndLogin({ ...mockUser2 });
    await agent
      .post('/api/v1/pet/')
      .send({
        ownerId: user.ownerId,
        name: 'bubba',
        birthday: '123',
        imageUrl: '',
      });
    const res = await agent
      .patch('/api/v1/pet/4')
      .send({ name: 'bubba', birthday: '456', imageUrl: '' });

    expect(res.body).toEqual({
      ownerId: expect.any(String),
      name: 'bubba',
      birthday: '456',
      imageUrl: '',
      petId: expect.any(String),
      contacts: [],
      medical: [],
    });

    const checkPet = await agent
    .get('/api/v1/pet/4');
    expect(checkPet.body).toEqual({
      ownerId: expect.any(String),
      name: 'bubba',
      birthday: '456',
      imageUrl: '',
      petId: expect.any(String),
      contacts: [null],
      medical: [null],
    });
  });

});
