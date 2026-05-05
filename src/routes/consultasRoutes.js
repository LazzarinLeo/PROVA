const express = require('express')
const router = express.Router()

const consultasController = require('../controllers/consultasController')

router.post('/', consultasController.criarConsulta)
router.get('/', consultasController.listarConsultas)
router.get('/:id', consultasController.buscarConsultaPorId)
router.put('/:id', consultasController.atualizarConsulta)
router.delete('/:id', consultasController.deletarConsulta)

module.exports = router