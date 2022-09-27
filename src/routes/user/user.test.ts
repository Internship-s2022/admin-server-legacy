import request from 'supertest';

import app from 'src/app';

//TODO GET tests

const deleteIdUser = '20';
describe('PUT - change isActive = false', () => {
  test('It should delete user', async () => {
    const response = await request(app).put(`/user/${deleteIdUser}`);
    expect(response.body.message).toBe('User deleted');
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
});
