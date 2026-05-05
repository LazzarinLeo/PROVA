const animaisService = require('../services/animaisService')

const criarAnimal = async (req, res) => {
  try {
    const animal = await animaisService.criarAnimal(req.body)
    res.status(201).json(animal)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const listarAnimais = async (req, res) => {
  try {
    const animais = await animaisService.listarAnimais()
    res.json(animais)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const buscarAnimalPorId = async (req, res) => {
  try {
    const animal = await animaisService.buscarAnimalPorId(req.params.id)

    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' })
    }

    res.json(animal)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const atualizarAnimal = async (req, res) => {
  try {
    const animal = await animaisService.atualizarAnimal(
      req.params.id,
      req.body
    )

    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' })
    }

    res.json(animal)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

const deletarAnimal = async (req, res) => {
  try {
    await animaisService.deletarAnimal(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

module.exports = {
  criarAnimal,
  listarAnimais,
  buscarAnimalPorId,
  atualizarAnimal,
  deletarAnimal
}