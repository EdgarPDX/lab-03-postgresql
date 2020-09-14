const pool = require('../utils/pool.js');

class MOVIE {
    id;
    name;
    rating;
    director;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.rating = row.rating;
      this.director = row.director;
    }

    static async insert(movie) {
      const { rows } = await pool.query(
        'INSERT INTO movies (name, rating, director) VALUES ($1, $2, $3) RETURNING *',
        [movie.name, movie.rating, movie.director]
      );

      return new MOVIE(rows[0]);
    }
}

module.exports = MOVIE;
