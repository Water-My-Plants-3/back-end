const db = require('../database/dbConfig');

async function add(plant) {
  const [id] = await db('plants').insert(plant);

  return findbyid(id);
}

function findby(filter) {
  return db('plants').where(filter);
}

function findbyid(id) {
  return db('plants').where({ id }).first();
}

function update(id, changes) {
  return db('plants').where({ id }).update(changes);
}

module.exports = {
  add,
  findby,
  findbyid,
  update,
};
