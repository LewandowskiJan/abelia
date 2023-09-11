import * as request from 'supertest';

const baseURL = 'http://localhost:3000/';

describe('UserController (e2e)', () => {
  const apiRequest = request(baseURL);
  let token;
  let userId;

  beforeAll(async () => {
    const createAccount = await apiRequest.post('user').send({
      email: 'e2e.test.user@test.test',
      password: 'E2E-test-psw',
      firstName: 'e2e-first-name',
      lastName: 'e2e-last-name',
      roles: ['user'],
    });

    const logInResponse = await apiRequest.post('auth/login').send({
      email: 'e2e.test.user@test.test',
      password: 'E2E-test-psw',
    });

    token = logInResponse.body['accessToken'];
    userId = createAccount.body['id'];
  });

  afterAll(async () => {
    await apiRequest
      .delete(`user/${userId}`)
      .set('Authorization', 'Bearer ' + token);
  });

  describe('POST: user', () => {
    it('should response status 201', async () => {
      const response = await apiRequest.post('user').send({
        email: 'e2e.test.second.user@test.test',
        password: 'E2E-test-psw',
        firstName: 'e2e-first-name',
        lastName: 'e2e-last-name',
        roles: ['user'],
      });

      expect(response.status).toBe(201);
      expect(response.body.email).toBe('e2e.test.second.user@test.test');
      expect(response.body.firstName).toBe('e2e-first-name');
      expect(response.body.lastName).toBe('e2e-last-name');
      expect(response.body.roles[0]).toBe('user');
      expect(response.body.roles.length).toBe(1);

      const logInResponse = await apiRequest.post('auth/login').send({
        email: 'e2e.test.second.user@test.test',
        password: 'E2E-test-psw',
      });
      expect(logInResponse.body['accessToken']).toBeTruthy();

      const deleteResponse = await apiRequest
        .delete(`user/${response.body.id}`)
        .set('Authorization', 'Bearer ' + logInResponse.body['accessToken']);
      expect(deleteResponse.status).toBe(200);
    });

    it('should response status 401', async () => {
      const response = await apiRequest.get('user');
      expect(response.status).toBe(401);
    });
  });

  describe('GET: user', () => {
    it('should response status 200', async () => {
      const response = await apiRequest
        .get('user')
        .set('Authorization', 'Bearer ' + token);
      expect(response.status).toBe(200);
    });

    it('should response status 401', async () => {
      const response = await apiRequest.get('user');
      expect(response.status).toBe(401);
    });
  });

  describe('GET: user/{userId}', () => {
    it('should response status 200 with body', async () => {
      const response = await apiRequest
        .get(`user/${userId}`)
        .set('Authorization', 'Bearer ' + token);

      expect(response.status).toBe(200);
      expect(response.body?.email).toBe('e2e.test.user@test.test');
      expect(response.body?.firstName).toBe('e2e-first-name');
      expect(response.body?.lastName).toBe('e2e-last-name');
    });

    it('should response status 401', async () => {
      const response = await apiRequest.get(`user/${userId}`);
      expect(response.status).toBe(401);
    });
  });

  describe('PUT: user/{userId}', () => {
    it('should response status 200 after update', async () => {
      const update = await apiRequest
        .put(`user/${userId}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          firstName: 'firstName_2',
          lastName: 'lastName_2',
          roles: ['user'],
        });

      expect(update.status).toBe(200);
      expect(update.body['firstName']).toBe('firstName_2');
      expect(update.body['lastName']).toBe('lastName_2');

      const revert = await apiRequest
        .put(`user/${userId}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          firstName: 'e2e-first-name',
          lastName: 'e2e-last-name',
          roles: ['user'],
        });
      expect(revert.status).toBe(200);
      expect(revert.body['firstName']).toBe('e2e-first-name');
      expect(revert.body['lastName']).toBe('e2e-last-name');
    });
  });
});
