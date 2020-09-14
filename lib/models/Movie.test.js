const fs = require('fs');
const pool = require('../utils/pool.js');
const MOVIE = require('./Movie.js');

describe('Movie Model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('INSERTS a Movie', async() => {
    const createdMovie = await MOVIE.insert({
      name: 'The Godfather',
      rating: 5,
      director: 'Francis Ford Coppola'
    });

    expect(createdMovie).toEqual({
      id: expect.any(String),  
      name: 'The Godfather',
      rating: 5,
      director: 'Francis Ford Coppola'
    });
  });
});
