const fs = require('fs');
const pool = require('../utils/pool.js');
const PET = require('./Pets.js');

describe('PET Model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('INSERTS a Pet', async() => {
    const createdPet = await PET.insert({
      name: 'Miloh',
      animal:'dog',
      breed: 'Malti-Poo',
      age: 3
    });

    expect(createdPet).toEqual({
      id: expect.any(String),  
      name: 'Miloh',
      animal:'dog',
      breed: 'Malti-Poo',
      age: 3
    });

  });
  it('gets all pets', async() => {
    await Promise.all([
      PET.insert({ name: 'Miloh', animal: 'dog', breed: 'Malti-Poo', age: 3 }),
      PET.insert({ name: 'Spot', animal: 'dog', breed: 'Shit-Poo', age: 7 }),
      PET.insert({ name: 'Raj', animal: 'dog', breed: 'Malti-Poo', age: 10 }),
      PET.insert({ name: 'Murtle', animal: 'tortoise', breed: 'Russian Tortoise', age: 50 }),
    ]);

    const pets = await PET.allPets();

    expect(pets).toEqual(expect.arrayContaining([
      ({ id: expect.any(String), name: 'Miloh', animal: 'dog', breed: 'Malti-Poo', age: 3 }),
      ({ id: expect.any(String), name: 'Spot', animal: 'dog', breed: 'Shit-Poo', age: 7 }),
      ({ id: expect.any(String), name: 'Raj', animal: 'dog', breed: 'Malti-Poo', age: 10 }),
      ({ id: expect.any(String), name: 'Murtle', animal: 'tortoise', breed: 'Russian Tortoise', age: 50 })
    ]));
  });


  it('Updates Pet by id', async() => {
    const createdPet = await PET.insert({
      name: 'Miloh',
      animal:'dog',
      breed: 'Malti-Poo',
      age: 3
    });

    const updatedPet = await PET.updatePet(createdPet.id, {
      name: 'Miloh',
      animal:'dog',
      breed: 'Malti-Poo',
      age: 4
    });

    expect(updatedPet).toEqual({
      id: createdPet.id,
      name: 'Miloh',
      animal:'dog',
      breed: 'Malti-Poo',
      age: 4
    });
  });

  it('Deletes Pet by id', async() => {
    const createdPet = await PET.insert({
      name: 'Miloh',
      animal:'dog',
      breed: 'Malti-Poo',
      age: 3
    });

    const deletedPet = await PET.deletedPet(createdPet.id);

    expect(deletedPet).toEqual({
      id: createdPet.id,
      name: 'Miloh',
      animal:'dog',
      breed: 'Malti-Poo',
      age: 3
    });
  });


});
