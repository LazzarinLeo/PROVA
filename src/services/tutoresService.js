const pool = require('../database/db')

const criarTutor = async ({ nome, telefone, email }) => {
  const result = await pool.query(
    `
    INSERT INTO tutores (nome, telefone, email)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [nome, telefone, email]
  )
  return result.rows[0]
}

const listarTutores = async () => {
  const result = await pool.query(`
    SELECT id, nome, telefone, email
    FROM tutores
    ORDER BY id
  `)
  return result.rows
}

const buscarTutorPorId = async (id) => {
  const result = await pool.query(
    `SELECT * FROM tutores WHERE id = $1`,
    [id]
  )
  return result.rows[0]
}

const atualizarTutor = async (id, { nome, telefone, email }) => {
  const result = await pool.query(
    `
    UPDATE tutores
    SET nome = $1,
        telefone = $2,
        email = $3
    WHERE id = $4
    RETURNING *
    `,
    [nome, telefone, email, id]
  )
  return result.rows[0]
}

const deletarTutor = async (id) => {
  await pool.query(
    `DELETE FROM tutores WHERE id = $1`,
    [id]
  )
  return { mensagem: 'Tutor removido com sucesso' }
}

module.exports = {
  criarTutor,
  listarTutores,
  buscarTutorPorId,
  atualizarTutor,
  deletarTutor
}