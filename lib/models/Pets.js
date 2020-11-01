const pool = require('../utils/pool.js');

class PET {
    id;
    name;
    animal;
    breed;
    age;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.animal = row.animal;
      this.breed = row.breed;
      this.age = row.age;
    }

    static async insert(pet) {
      const { rows } = await pool.query(
        'INSERT INTO pets (name, animal, breed, age) VALUES ($1, $2, $3, $4) RETURNING *',
        [pet.name, pet.animal, pet.breed, pet.age]
      );

      return new PET(rows[0]);
    }

    static async allPets() {
      const { rows } = await pool.query(
        'SELECT * FROM pets'
      );
      return rows.map(row => new PET(row));
    }

    static async updatePet(id, updatedPet) {
      const { rows } = await pool.query(
        `UPDATE pets
            SET name=$1,
                animal=$2,
                breed=$3,
                age=$4
            WHERE id=$5
            RETURNING *
            `,
        [updatedPet.name, updatedPet.animal, updatedPet.breed, updatedPet.age, id]
      );

      return new PET(rows[0]);
    }

    static async deletedPet(id) {
      const { rows } = await pool.query(
        'DELETE FROM pets WHERE id=$1 RETURNING *',
        [id]
      );

      return new PET(rows[0]);
    }
}

module.exports = PET;
