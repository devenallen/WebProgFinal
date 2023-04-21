const request = require('supertest');
const app = require('./index'); // assuming your index.js file is in the same directory as index.test.js

describe('GET /api/teams', () => {
    it('should return a list of teams', async () => {
      const res = await request(app).get('/api/teams');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('teams');
    });
  });
  
  describe('POST /api/teams', () => {
    it('should create a new team', async () => {
      const newTeam = { name: 'Test Team' };
      const res = await request(app)
        .post('/api/teams')
        .send(newTeam);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('msg', 'Team added successfully');
    });
  });
  