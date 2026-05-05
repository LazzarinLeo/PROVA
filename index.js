const express = require('express');
const tutoresRoutes = require('./src/routes/tutoresRoutes')
const animaisRoutes = require('./src/routes/animaisRoutes')
const consultasRoutes = require('./src/routes/consultasRoutes')
const app = express();

app.use(express.json());
app.use('/tutores', tutoresRoutes)
app.use('/consultas', consultasRoutes)
app.use('/animais', animaisRoutes)
app.get('/', (req, res) => {
    res.json({
        sistema: 'Veterinario',
        status: 'Online'
    })
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Endereço: http://localhost:${PORT}`)
})