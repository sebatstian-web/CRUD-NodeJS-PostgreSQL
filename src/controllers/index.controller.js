// Realizando conexión a Postgres
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'admin',
  database: 'restapi_node_postgres',
  port: 5432,
});

const getUsers = async (req, res) => {
  try {
    const resp = await pool.query('select * from users;');

    res.json({
      ok: true,
      message: 'Lista de todos los usuarios',
      usuarios: resp.rows,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al realizar la operación',
      error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    await pool.query('insert into users (name, email) values ($1, $2)', [
      name,
      email,
    ]);

    res.status(201).json({
      ok: true,
      message: 'Usuario creado exitosamente',
      usuario: {
        nombre: name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al realizar la operación',
      error,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await pool.query('select * from users where id = $1', [id]);

    if (!resp.rowCount)
      return res.status(400).json({
        ok: false,
        message: `No existe usuario con id ${id}`,
      });

    res.json({
      ok: true,
      message: 'Información del usuario',
      usuario: resp.rows,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al realizar la operación',
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await pool.query('delete from users where id = $1', [id]);

    if (!resp.rowCount)
      return res.status(400).json({
        ok: false,
        message: `No existe usuario con id ${id}`,
      });

    res.json({
      ok: true,
      message: 'Usuario eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al realizar la operación',
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const resp = await pool.query(
      'update users set name = $1, email = $2 where id = $3',
      [name, email, id]
    );

    if (!resp.rowCount)
      return res.status(400).json({
        ok: false,
        message: `No existe usuario con id ${id}`,
      });

    res.json({
      ok: true,
      message: 'Usuario actualizado exitosamente',
      usuario: {
        nombre: name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al realizar la operación',
      error,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
