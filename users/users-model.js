const db = require('../database/dbConfig');

async function add(user) {
  const [id] = await db('users').insert(user, 'id');

  return findbyid(id);
}

function findby(filter) {
  return db('users').where(filter);
}

function findbyid(id) {
  return db('users').where({ id }).first();
}

function update(id, changes) {
  return db('users').where({ id }).update(changes);
}

module.exports = {
  add,
  findby,
  findbyid,
  update,
};
