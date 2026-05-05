const consultasService = require('../services/consultasService')

const criarConsulta = async (req, res) => {
  try {
    const consulta = await consultasService.criarConsulta(req.body)
    res.status(201).json(consulta)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const listarConsultas = async (req, res) => {
  try {
    const consultas = await consultasService.listarConsultas()
    res.json(consultas)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const buscarConsultaPorId = async (req, res) => {
  try {
    const consulta = await consultasService.buscarConsultaPorId(req.params.id)

    if (!consulta) {
      return res.status(404).json({ erro: 'Consulta não encontrada' })
    }

    res.json(consulta)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const atualizarConsulta = async (req, res) => {
  try {
    const consulta = await consultasService.atualizarConsulta(
      req.params.id,
      req.body
    )

    if (!consulta) {
      return res.status(404).json({ erro: 'Consulta não encontrada' })
    }

    res.json(consulta)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const deletarConsulta = async (req, res) => {
  try {
    await consultasService.deletarConsulta(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const listarConsultasPorAnimal = async (req, res) => {
  try {
    const consultas = await consultasService.listarConsultasPorAnimal(
      req.params.id
    )

    if (consultas.length === 0) {
      return res.status(404).json({
        erro: 'Nenhuma consulta encontrada para este animal'
      })
    }

    res.json(consultas)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

module.exports = {
  criarConsulta,
  listarConsultas,
  buscarConsultaPorId,
  atualizarConsulta,
  deletarConsulta,
  listarConsultasPorAnimal
}
