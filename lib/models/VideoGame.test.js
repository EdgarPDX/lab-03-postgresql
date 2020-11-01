const fs = require('fs');
const pool = require('../utils/pool.js');
const VIDEOGAME = require('./VideoGame.js');

describe('VideoGame Model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('INSERTS a Video Game', async() => {
    const createdGame = await VIDEOGAME.insert({
      name: 'GTA V',
      rating: 5,
      genre: 'open world',
      platform: 'PC'
    });

    expect(createdGame).toEqual({
      id: expect.any(String),
      name: 'GTA V',
      rating: 5,
      genre: 'open world',
      platform: 'PC'
    });

  });
  it('gets all videogames', async() => {
    await Promise.all([
      VIDEOGAME.insert({ name: 'GTA V', rating: 5, genre: 'open world', platform: 'PC' }),
      VIDEOGAME.insert({ name: 'Fall Guys', rating: 5, genre: 'survival', platform: 'PS4' }),
      VIDEOGAME.insert({ name: 'Tetris', rating: 5, genre: 'puzzle', platform: 'Mobile' }),
      VIDEOGAME.insert({ name: 'Rocket League', rating: 5, genre: 'sports', platform: 'PC' })
    ]);

    const games = await VIDEOGAME.allGames();

    expect(games).toEqual(expect.arrayContaining([
      ({ id: expect.any(String), name: 'GTA V', rating: 5, genre: 'open world', platform: 'PC' }),
      ({ id: expect.any(String), name: 'Fall Guys', rating: 5, genre: 'survival', platform: 'PS4' }),
      ({ id: expect.any(String), name: 'Tetris', rating: 5, genre: 'puzzle', platform: 'Mobile' }),
      ({ id: expect.any(String), name: 'Rocket League', rating: 5, genre: 'sports', platform: 'PC' })
    ]));
  });


  it('Updates Video Game by id', async() => {
    const createdGame = await VIDEOGAME.insert({
      name: 'GTA V',
      rating: 5,
      genre: 'open world',
      platform: 'PC'
    });

    const updatedGame = await VIDEOGAME.updateMovie(createdGame.id, {
      name: 'Grand Theft Auto V',
      rating: 5,
      genre: 'open world',
      platform: 'PC'
    });

    expect(updatedGame).toEqual({
      id: createdGame.id,  
      name: 'Grand Theft Auto V',
      rating: 5,
      genre: 'open world',
      platform: 'PC'
    });
  });

  it('Deletes video Game by id', async() => {
    const createdGame = await VIDEOGAME.insert({
      name: 'GTA V',
      rating: 5,
      genre: 'open world',
      platform: 'PC'
    });

    const deletedGame = await VIDEOGAME.deleteGame(createdGame.id);

    expect(deletedGame).toEqual({
      id: createdGame.id,
      name: 'GTA V',
      rating: 5,
      genre: 'open world',
      platform: 'PC'
    });
  });


});
