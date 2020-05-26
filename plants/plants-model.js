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

function findbyuser(user_id) {
  return db('plants').where({ user_id });
}

function update(id, changes) {
  return db('plants').where({ id }).update(changes);
}

function remove(id) {
  return db('plants').where(id).del();
}
module.exports = {
  add,
  findby,
  findbyuser,
  findbyid,
  update,
  remove,
};
