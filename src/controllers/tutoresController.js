const tutoresService = require('../services/tutoresService')

const criarTutor = async (req, res) => {
  try {
    const tutor = await tutoresService.criarTutor(req.body)
    res.status(201).json(tutor)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const listarTutores = async (req, res) => {
  try {
    const tutores = await tutoresService.listarTutores()
    res.json(tutores)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const buscarTutorPorId = async (req, res) => {
  try {
    const tutor = await tutoresService.buscarTutorPorId(req.params.id)

    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado' })
    }

    res.json(tutor)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const atualizarTutor = async (req, res) => {
  try {
    const tutor = await tutoresService.atualizarTutor(
      req.params.id,
      req.body
    )

    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado' })
    }

    res.json(tutor)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const deletarTutor = async (req, res) => {
  try {
    await tutoresService.deletarTutor(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

module.exports = {
  criarTutor,
  listarTutores,
  buscarTutorPorId,
  atualizarTutor,
  deletarTutor
}