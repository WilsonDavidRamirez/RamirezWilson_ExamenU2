const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');

class ProviderService {
  constructor() {}

  async find() {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM providers');
    return result.rows;
  }

  async findOne(id) {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM providers WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      throw boom.notFound('Provider not found');
    }
    return result.rows[0];
  }

  async create(data) {
    const client = await getConnection();
    const query = 'INSERT INTO providers (name, ruc, direccion, estado) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [data.name, data.ruc, data.direccion, data.estado];
    const result = await client.query(query, values);
    return result.rows[0];
  }

  async update(id, changes) {
    const client = await getConnection();
    const query = 'UPDATE providers SET name = $1, ruc = $2, direccion = $3, estado = $4 WHERE id = $5 RETURNING *';
    const values = [changes.name, changes.ruc, changes.direccion, changes.estado, id];
    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      throw boom.notFound('Provider not found');
    }
    return result.rows[0];
  }

  async delete(id) {
    const client = await getConnection();
    const query = 'DELETE FROM providers WHERE id = $1 RETURNING id';
    const result = await client.query(query, [id]);
    if (result.rows.length === 0) {
      throw boom.notFound('Provider not found');
    }
    return { id };
  }
}

module.exports = ProviderService;
