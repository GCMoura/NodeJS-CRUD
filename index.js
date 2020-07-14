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

const verifyData = (flag, db, data) => {
    for(let i = 0; i < db.length; i++){
        if(db[i].name === data.name && db[i].email === data.email) {
            console.log('Usuário já existe')
            flag = true
        } 
    }
    return flag
}

router.get('/', (req, res) => {
    const content = readFile()
    res.send(content)
})

router.post('/', (req, res) => {
    const { name, email, phone } = req.body
    const currentData = readFile()

    const id = Math.random().toString(32).substr(2, 9)

    var flag = false

    const returnVerifyData = verifyData(flag, currentData, {name, email})

    if(returnVerifyData == false) {
        currentData.push({ id, name, email, phone})
        writeFile(currentData)
        res.send({ id, name, email, phone })
    } else {
        res.send('Usuário já cadastrado')
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    console.log(id)
})

server.use(router)

server.listen(3000, () => {
    console.log('Servidor funcionando')
})