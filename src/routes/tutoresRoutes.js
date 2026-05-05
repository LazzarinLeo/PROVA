const express = require('express')
const router = express.Router()

const tutoresController = require('../controllers/tutoresController')

router.post('/', tutoresController.criarTutor)
router.get('/', tutoresController.listarTutores)
router.get('/:id', tutoresController.buscarTutorPorId)
router.put('/:id', tutoresController.atualizarTutor)
router.delete('/:id', tutoresController.deletarTutor)

module.exports = router