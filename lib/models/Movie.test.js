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
  it('gets all movies', async() => {
    await Promise.all([
      MOVIE.insert({ name: 'The Godfather', rating: 5, director: 'Francis Ford Coppola' }),
      MOVIE.insert({ name: 'Air Bud', rating: 1, director: 'Charles Martin Smith' }),
      MOVIE.insert({ name: 'October Sky', rating: 5, director: 'Joe Johnston' }),
      MOVIE.insert({ name: 'Hancock', rating: 1, director: 'Peter Burg' })
    ]);

    const movies = await MOVIE.allMovies();

    expect(movies).toEqual(expect.arrayContaining([
      ({ id: expect.any(String), name: 'The Godfather', rating: 5, director: 'Francis Ford Coppola' }),
      ({ id: expect.any(String), name: 'Air Bud', rating: 1, director: 'Charles Martin Smith' }),
      ({ id: expect.any(String), name: 'October Sky', rating: 5, director: 'Joe Johnston' }),
      ({ id: expect.any(String), name: 'Hancock', rating: 1, director: 'Peter Burg' })
    ]));
  });


  it('Updates Movie by id', async() => {
    const createdMovie = await MOVIE.insert({
      name: 'The Godfather',
      rating: 5,
      director: 'Francis Ford Coppola'
    });

    const updatedMovie = await MOVIE.updateMovie(createdMovie.id, {
      name: 'The Godfather Part I',
      rating: 5,
      director: 'Francis Ford Coppola'
    });

    expect(updatedMovie).toEqual({
      id:createdMovie.id,
      name: 'The Godfather Part I',
      rating: 5,
      director: 'Francis Ford Coppola'
    });
  });

  it('Deletes movie by id', async() => {
    const createdMovie = await MOVIE.insert({
      name: 'The Godfather Part I',
      rating: 5,
      director: 'Francis Ford Coppola'
    });

    const deletedMovie = await MOVIE.deleteMovie(createdMovie.id);

    expect(deletedMovie).toEqual({
      id: createdMovie.id,
      name: 'The Godfather Part I',
      rating: 5,
      director: 'Francis Ford Coppola'
    });
  });


});
