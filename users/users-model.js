const db = require('../database/dbConfig');

async function add(user) {
  const [id] = await db('users').insert(user, 'id');

  return findbyid(id);
}

function find() {
  return db('users').select(
    'id',
    'first_name',
    'last_name',
    'username',
    'password',
    'phone'
  );
}

function findby(filter) {
  return db('users').where(filter);
}

function findbyid(id) {
  return db('users').where({ id }).first();
}

async function update(id, changes) {
  await db('users').where({ id }).update(changes);

  return findbyid(id);
}

module.exports = {
  add,
  findby,
  findbyid,
  find,
  update,
};
