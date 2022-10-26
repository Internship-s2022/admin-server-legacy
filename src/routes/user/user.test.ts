import request from 'supertest';

import app from 'src/app';

describe('GET /users', () => {
  test.skip('It should get the user list', async () => {
    const response = await request(app).get('/user');
    expect(response.body.message).toBe('The list has been successfully retrieved');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(2);
  });
});
