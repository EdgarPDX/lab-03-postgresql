const pool = require('../utils/pool.js');

class VIDEOGAME {
    id;
    name;
    rating;
    genre;
    platform;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.rating = row.rating;
      this.genre = row.genre;
      this.platform = row.platform;
    }

    static async insert(videGame) {
      const { rows } = await pool.query(
        'INSERT INTO videogames (name, rating, genre, platform) VALUES ($1, $2, $3, $4) RETURNING *',
        [videGame.name, videGame.rating, videGame.genre, videGame.platform]
      );

      return new VIDEOGAME(rows[0]);
    }

    static async allGames() {
      const { rows } = await pool.query(
        'SELECT * FROM videogames'
      );
      return rows.map(row => new VIDEOGAME(row));
    }

    static async updateMovie(id, updatedGame) {
      const { rows } = await pool.query(
        `UPDATE videogames
            SET name=$1,
                rating=$2,
                genre=$3,
                platform=$4
            WHERE id=$5
            RETURNING *
            `,
        [updatedGame.name, updatedGame.rating, updatedGame.genre, updatedGame.platform, id]
      );

      return new VIDEOGAME(rows[0]);
    }

    static async deleteGame(id) {
      const { rows } = await pool.query(
        'DELETE FROM videogames WHERE id=$1 RETURNING *',
        [id]
      );

      return new VIDEOGAME(rows[0]);
    }
}

module.exports = VIDEOGAME;
