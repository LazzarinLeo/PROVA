const express = require('express')
const router = express.Router()

const animaisController = require('../controllers/animaisController')
const consultasController = require('../controllers/consultasController')

router.post('/', animaisController.criarAnimal)
router.get('/', animaisController.listarAnimais)
router.get('/:id/consultas', consultasController.listarConsultasPorAnimal)
router.get('/:id', animaisController.buscarAnimalPorId)
router.put('/:id', animaisController.atualizarAnimal)
router.delete('/:id', animaisController.deletarAnimal)


module.exports = router