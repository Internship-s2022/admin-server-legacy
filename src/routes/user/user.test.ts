import request from 'supertest';

import app from 'src/app';

// TODO GET tests

const deleteIdUser = '20';
describe('PATCH - change isActive => false', () => {
  test.skip('It should delete user', async () => {
    const response = await request(app).put(`/user/${deleteIdUser}`);
    expect(response.body.message).toBe('User deleted');
    expect(response.status).toBe(200);
  });
});
