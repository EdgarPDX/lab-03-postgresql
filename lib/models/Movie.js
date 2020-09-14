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

    static async allMovies() {
      const { rows } = await pool.query(
        'SELECT * FROM movies'
      );
      return rows.map(row => new MOVIE(row));
    }

    static async updateMovie(id, updatedMovie) {
      const { rows } = await pool.query(
        `UPDATE movies
            SET name=$1,
                rating=$2,
                director=$3
            WHERE id=$4
            RETURNING *
            `,
        [updatedMovie.name, updatedMovie.rating, updatedMovie.director, id]
      );

      return new MOVIE(rows[0]);
    }

    static async deleteMovie(id) {
      const { rows } = await pool.query(
        'DELETE FROM movies WHERE id=$1 RETURNING *',
        [id]
      );

      return new MOVIE(rows[0]);
    }
}

module.exports = MOVIE;
