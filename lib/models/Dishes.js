const pool = require('../utils/pool.js');

class DISH {
    id;
    name;
    rating;
    type;
    vegetarian;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.rating = row.rating;
      this.type = row.type;
      this.vegetarian = row.vegetarian;
    }

    static async insert(dish) {
      const { rows } = await pool.query(
        'INSERT INTO dishes (name, rating, type, vegetarian) VALUES ($1, $2, $3, $4) RETURNING *',
        [dish.name, dish.rating, dish.type, dish.vegetarian]
      );

      return new DISH(rows[0]);
    }

    static async allDishes() {
      const { rows } = await pool.query(
        'SELECT * FROM dishes'
      );
      return rows.map(row => new DISH(row));
    }

    static async updateDish(id, updatedDish) {
      const { rows } = await pool.query(
        `UPDATE dishes
            SET name=$1,
                rating=$2,
                type=$3,
                vegetarian=$4
            WHERE id=$5
            RETURNING *
            `,
        [updatedDish.name, updatedDish.rating, updatedDish.type, updatedDish.vegetarian, id]
      );

      return new DISH(rows[0]);
    }

    static async deleteDish(id) {
      const { rows } = await pool.query(
        'DELETE FROM dishes WHERE id=$1 RETURNING *',
        [id]
      );

      return new DISH(rows[0]);
    }
}

module.exports = DISH;
