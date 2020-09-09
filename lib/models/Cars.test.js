const fs = require('fs');
const pool = require('../utils/pool.js');
const CAR = require('./Car.js');

describe('Car Model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('INSERTS a car', async() => {
    const createdCar = await CAR.insert({
      name: 'Pinto',
      make: 'Ford',
      color: 'brown',
      year: 1975
    });

    expect(createdCar).toEqual({
      id: expect.any(String),
      name: 'Pinto',
      make: 'Ford',
      color: 'brown',
      year: 1975
    });
  });

  it('finds a car by id', async() => {
    const createdCar = await CAR.insert({
      name: 'Pinto',
      make: 'Ford',
      color: 'brown',
      year: 1975
    });

    const foundCar = await CAR.findById(createdCar.id);

    expect(foundCar).toEqual({
      id: createdCar.id,
      name: 'Pinto',
      make: 'Ford',
      color: 'brown',
      year: 1975
    });
  });

  it('gets all cars', async() => {
    await Promise.all([
      CAR.insert({ name: 'Pinto', make: 'Ford', color: 'brown', year: 1975 }),
      CAR.insert({ name: 'Mustang', make: 'Ford', color: 'red', year: 1969 }),
      CAR.insert({ name: 'Celica', make: 'Toyota', color: 'silver', year: 2005 }),
      CAR.insert({ name: 'Civic', make: 'Honda', color: 'yellow', year: 1990 })
    ]);
    
    const cars = await CAR.allCars();    
    
    expect(cars).toEqual(expect.arrayContaining([
      ({ id: expect.any(String), name: 'Pinto', make: 'Ford', color: 'brown', year: 1975 }),
      ({ id: expect.any(String), name: 'Mustang', make: 'Ford', color: 'red', year: 1969 }),
      ({ id: expect.any(String), name: 'Celica', make: 'Toyota', color: 'silver', year: 2005 }),
      ({ id: expect.any(String), name: 'Civic', make: 'Honda', color: 'yellow', year: 1990 })
    ]));

  });

  it('updates car by id', async() => {
    const createdCar = await CAR.insert({
      name: 'Pinto',
      make: 'Ford',
      color: 'brown',
      year: 1975
    });

    const updatedCar = await CAR.updateCar(createdCar.id, {
      name: 'Pinto',
      make: 'Ford',
      color: 'green',
      year: 1970
    });
    
     
    expect(updatedCar).toEqual({
      id: createdCar.id,
      name: 'Pinto',
      make: 'Ford',
      color: 'green',
      year: 1970
    });

  });

  it('Deletes car by id', async() => {
    const createdCar = await CAR.insert({
      name: 'Pinto',
      make: 'Ford',
      color: 'brown',
      year: 1975
    });

    const deletedCar = await CAR.deleteCar(createdCar.id);
    
     
    expect(deletedCar).toEqual({
      id: createdCar.id,
      name: 'Pinto',
      make: 'Ford',
      color: 'brown',
      year: 1975
    });

  });


});
