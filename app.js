require('dotenv').config()

const express = require('express')
const mysql = require('mysql')

// Establish MySQL database connection
const db = mysql.createConnection({
    host: '34.130.169.52',
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'canadian_post_secondary'
})
db.connect((err) => {
    if(err) throw err;
    console.log("Connected to database.")
})

const app = express()

app.use(express.json())
app.listen(3000, () => console.log("Start"))

//GET all universities
app.get('/', (req, res) => {
    let sql = 'SELECT name FROM Institutions'

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send('Here is the list of all the institutions: ' + unisToList(result))
    })
})

//GET all universities in province
app.get('/:province', (req, res) => {
    var provinceString = capitalize(req.params.province)
    let sql = "SELECT name FROM Institutions WHERE province = \'" + provinceString + "\'"

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send('Here is the list of all the institutions in ' + req.params.province + ': ' + unisToList(result))
    })
})

// Returns the RowDataPacket object as an array
function unisToList(unis){
    const uniArray = []
    var l = Object.keys(unis).length;
    for(let i = 0; i < l; i++) uniArray.push(unis[i].name)
    return uniArray
}

// Replaces underscores with spaces and capitalizes the beginning of each word
function capitalize(s){
    var provinceArray = s.split('_')

    for (var i = 0; i < provinceArray.length; i++)
        provinceArray[i] = provinceArray[i].charAt(0).toUpperCase() + provinceArray[i].substring(1)

    var provinceString = provinceArray.join(' ')
    return provinceString
}