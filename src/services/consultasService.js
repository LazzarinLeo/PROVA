const pool = require('../database/db')

const criarConsulta = async ({
  animal_id,
  data_consulta,
  motivo,
  diagnostico,
  veterinario
}) => {
  const result = await pool.query(
    `
    INSERT INTO consultas (
      animal_id,
      data_consulta,
      motivo,
      diagnostico,
      veterinario
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [animal_id, data_consulta, motivo, diagnostico, veterinario]
  )
  return result.rows[0]
}

const listarConsultas = async () => {
  const result = await pool.query(`
    SELECT
      c.id,
      a.nome AS animal,
      c.data_consulta,
      c.motivo,
      c.diagnostico,
      c.veterinario
    FROM consultas c
    LEFT JOIN animais a
      ON c.animal_id = a.id
    ORDER BY c.id
  `)
  return result.rows
}

const buscarConsultaPorId = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM consultas
    WHERE id = $1
    `,
    [id]
  )
  return result.rows[0]
}

const atualizarConsulta = async (
  id,
  { animal_id, data_consulta, motivo, diagnostico, veterinario }
) => {
  const result = await pool.query(
    `
    UPDATE consultas
    SET animal_id = $1,
        data_consulta = $2,
        motivo = $3,
        diagnostico = $4,
        veterinario = $5
    WHERE id = $6
    RETURNING *
    `,
    [animal_id, data_consulta, motivo, diagnostico, veterinario, id]
  )
  return result.rows[0]
}

const deletarConsulta = async (id) => {
  await pool.query(
    `DELETE FROM consultas WHERE id = $1`,
    [id]
  )
  return { mensagem: 'Consulta removida com sucesso' }
}

const listarConsultasPorAnimal = async (animalId) => {
  const result = await pool.query(
    `
    SELECT
      c.id,
      c.data_consulta,
      c.motivo,
      c.diagnostico,
      c.veterinario,
      a.id AS animal_id,
      a.nome AS animal_nome,
      a.especie,
      a.raca
    FROM consultas c
    INNER JOIN animais a
      ON c.animal_id = a.id
    WHERE a.id = $1
    ORDER BY c.data_consulta DESC
    `,
    [animalId]
  )

  return result.rows
}
module.exports = {
  criarConsulta,
  listarConsultas,
  buscarConsultaPorId,
  atualizarConsulta,
  deletarConsulta,
  listarConsultasPorAnimal
}
