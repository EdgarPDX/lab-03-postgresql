const fs = require('fs');
const pool = require('../utils/pool.js');
const DISH = require('./Dishes.js');

describe('DISH Model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('INSERTS a Dish', async() => {
    const createdDish = await DISH.insert({
      name: 'Veggie Pizza',
      rating: 8,
      type: 'Italian',
      vegetarian: true
    });

    expect(createdDish).toEqual({
      id: expect.any(String),
      name: 'Veggie Pizza',
      rating: 8,
      type: 'Italian',
      vegetarian: true
    });

  });
  it('gets all dishes', async() => {
    await Promise.all([
      DISH.insert({ name: 'Veggie Pizza', rating: 8, type: 'Italian', vegetarian: true }),
      DISH.insert({ name: 'Cheese Enchiladas', rating: 9, type: 'Mexican', vegetarian: true }),
      DISH.insert({ name: 'Butter Chicken', rating: 9, type: 'Indian', vegetarian: false }),
      DISH.insert({ name: 'Lamb Gyro', rating: 9, type: 'mediterranean', vegetarian: false })
    ]);

    const dishes = await DISH.allDishes();

    expect(dishes).toEqual(expect.arrayContaining([
      ({ id: expect.any(String), name: 'Veggie Pizza', rating: 8, type: 'Italian', vegetarian: true  }),
      ({ id: expect.any(String), name: 'Cheese Enchiladas', rating: 9, type: 'Mexican', vegetarian: true }),
      ({ id: expect.any(String), name: 'Butter Chicken', rating: 9, type: 'Indian', vegetarian: false }),
      ({ id: expect.any(String), name: 'Lamb Gyro', rating: 9, type: 'mediterranean', vegetarian: false })
    ]));
  });


  it('Updates Dish by id', async() => {
    const createdDish = await DISH.insert({
      name: 'Veggie Pizza',
      rating: 8,
      type: 'Italian',
      vegetarian: true
    });

    const updatedDish = await DISH.updateDish(createdDish.id, {
      name: 'Veggie Pizza',
      rating: 10,
      type: 'Italian',
      vegetarian: true
    });

    expect(updatedDish).toEqual({
      id: createdDish.id,  
      name: 'Veggie Pizza',
      rating: 10,
      type: 'Italian',
      vegetarian: true
    });
  });

  it('Deletes Dish by id', async() => {
    const createdDish = await DISH.insert({
      name: 'Veggie Pizza',
      rating: 8,
      type: 'Italian',
      vegetarian: true
    });

    const deletedGame = await DISH.deleteDish(createdDish.id);

    expect(deletedGame).toEqual({
      id: createdDish.id,
      name: 'Veggie Pizza',
      rating: 8,
      type: 'Italian',
      vegetarian: true
    });
  });


});
