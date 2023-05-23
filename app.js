const express = require('express')
const app = express()

app.use(express.json())
app.listen(3000, () => console.log("Start"))

//GET all universities
app.get('/', (req, res) => {
    res.send('Here is the list of all the universities.')
})

//GET all universities in province
app.get('/:province', (req, res) => {
    res.send('Here is the list of all the universities in ' + req.params.province)
})

//POST a new university
app.post('/', (req, res) => {

})