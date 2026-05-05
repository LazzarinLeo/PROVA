const pool = require('../database/db')

const criarAnimal = async ({
  nome,
  especie,
  raca,
  data_nascimento,
  tutor_id
}) => {
  const result = await pool.query(
    `
    INSERT INTO animais (nome, especie, raca, data_nascimento, tutor_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [nome, especie, raca, data_nascimento, tutor_id]
  )
  return result.rows[0]
}

const listarAnimais = async () => {
  const result = await pool.query(`
    SELECT
      a.id,
      a.nome,
      a.especie,
      a.raca,
      a.data_nascimento,
      a.tutor_id
    FROM animais a
    ORDER BY a.id
  `)
  return result.rows
}

const buscarAnimalPorId = async (id) => {
  const result = await pool.query(
    `SELECT * FROM animais WHERE id = $1`,
    [id]
  )
  return result.rows[0]
}

const atualizarAnimal = async (
  id,
  { nome, especie, raca, data_nascimento, tutor_id }
) => {
  const result = await pool.query(
    `
    UPDATE animais
    SET nome = $1,
        especie = $2,
        raca = $3,
        data_nascimento = $4,
        tutor_id = $5
    WHERE id = $6
    RETURNING *
    `,
    [nome, especie, raca, data_nascimento, tutor_id, id]
  )
  return result.rows[0]
}

const deletarAnimal = async (id) => {
  await pool.query(
    `DELETE FROM animais WHERE id = $1`,
    [id]
  )
  return { mensagem: 'Animal removido com sucesso' }
}

module.exports = {
  criarAnimal,
  listarAnimais,
  buscarAnimalPorId,
  atualizarAnimal,
  deletarAnimal
}