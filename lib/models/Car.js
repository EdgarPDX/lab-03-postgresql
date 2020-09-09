const pool = require('../utils/pool.js');

class CAR {
    id;
    name;
    make;
    color;
    year;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.make = row.make;
      this.color = row.color;
      this.year = row.year;
    }

    static async insert(car) {
      const { rows } = await pool.query(
        'INSERT INTO cars (name, make, color, year) VALUES ($1, $2, $3, $4) RETURNING *',
        [car.name, car.make, car.color, car.year]
      );

      return new CAR(rows[0]);
    }


    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM cars WHERE id = $1',
        [id]
      );

      return new CAR(rows[0]);

    }

    static async allCars() {
      const { rows } = await pool.query(
        'SELECT * FROM cars'  
      );

      return rows.map(row => new CAR(row));
    }

    static async updateCar(id, updatedCar) {
      const { rows } = await pool.query(
        `UPDATE cars
            SET name=$1,
                make=$2,
                color=$3,
                year=$4
            WHERE id=$5
            RETURNING *
            `,
        [updatedCar.name, updatedCar.make, updatedCar.color, updatedCar.year, id]
      );

      return new CAR(rows[0]);
    }

    static async deleteCar(id) {
      const { rows } = await pool.query(
        'DELETE FROM cars WHERE id=$1 RETURNING *',
        [id]
      );

      return new CAR(rows[0]);
    }
    

}

module.exports = CAR;
