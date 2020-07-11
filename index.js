const express = require('express')
const server = express()
const router = express.Router()
const fs = require('fs')

server.use(express.json({ extends: true }))

const readFile = () => {
    const content = fs.readFileSync('./data/db.json', 'utf-8')
    return JSON.parse(content)
}

const writeFile = (content) => {
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('./data/db.json', updateFile, 'utf-8')
}

router.get('/', (req, res) => {
    const content = readFile()
    res.send(content)
})

router.post('/user', (req, res) => {
    res.send('Teste post')
})

server.use(router)

server.listen(3000, () => {
    console.log('Servidor funcionando')
})