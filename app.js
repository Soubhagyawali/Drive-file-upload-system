const express = require('express');
const morgan = require('morgan');
const app = express()
const dbConnection = require('./config/db')
const userModel = require('./models/user');




app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


app.set("view engine", 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})


app.get('/about', (req, res) => {
  res.send('About page')
})

app.get('/profile', (req, res) => {
  res.send('profile page')
})

app.get('/register', (req, res) => {
  res.render('register')
})


//CRUD OPERATIONS
// creating a user 
app.post('/register', async (req, res)=> {
  const {username, email, password} = req.body

 const newUser = await userModel.create ({
    username:username,
    email: email,
    password: password
  })
  res.send(newUser)
})
  

//reading the user
app.get('/get-users', (req,res) => {
  userModel.find().then((users)=>{
    res.send(users)
  })
})


app.get('/get-users', (req,res) => {
  userModel.findOne({
    username: 'a'
  }).then((users)=>{
    res.send(users)
  })
})

//updating the user
app.get('/update-user', async(req,res) => {
  await userModel.findOneAndUpdate({
    username: 'a'                                //findOne which data is to be updated
  },{
    email: "sss.com"                            //update
  })
  res.send("user updated")
})


delete operation
app.get('/delete-user', async (req,res)=>{
  await userModel.findOneAndDelete({username: 'v'
  })
  res.send('user deleted')
})


app.post('/get-form-data', (req, res) => {
  console.log(req.body)
  res.send('data recieved');
})


app.listen(3000)