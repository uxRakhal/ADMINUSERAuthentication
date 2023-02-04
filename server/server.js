const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Person = require('./Models.js');
const Role = require('./Role.js');
const cors = require('cors');
const router = express.Router();
const circularJSON = require('circular-json');
const mongoSanitize = require('mongo-sanitize');
const session = require('express-session');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/AdminUser', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
(err) => {
  if (err) {
  console.log('Error connecting to MongoDB server');
  } else {
  console.log('Successfully connected to MongoDB server');
  }
  });




  // const db = mongoose.connection;

  // db.once('open', async ()=>{
    
  //     try {
  //       const adminRole = new Role({ name: 'admin', description: 'Admin role' });
  //       const userRole = new Role({ name: 'user', description: 'User role' });
  //       await adminRole.save();
  //       await userRole.save();
  //       console.log('Roles created successfully');
  //     } catch (err) {
  //       console.log(err); 
  //     }
  //   }
  // )





app.use(cors());
app.use(bodyParser.json());


app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));





router.post('/signup', async (req, res) => {
  
  const pass = mongoSanitize(req.body.password);

  const user = await Person.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ error: 'Email already in use' });
  console.log("Email in use");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);
  const name  =  mongoSanitize(req.body.name);
  const email =  mongoSanitize(req.body.email);
  
  req.session.user = user;
  const sessionId = req.session.id;

  const newperson = new Person({
    name: name,
    email: email,
    password: hashedPassword,
  });
  await newperson.save();
  id = newperson._id;
  
  try{
  const token = jwt.sign({ sessionId }, process.env.JWT_SECRET, { expiresIn: 3600 });
  res.json({ token });
} catch (err) {
  res.status(500).json({ message: err.message });
}
})





router.post('/signup/user', async (req, res) => {
  
  const pass = mongoSanitize(req.body.password);

  const user = await Person.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ error: 'Email already in use' });
  console.log("Email in use");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  const name  =  mongoSanitize(req.body.name);
  const email =  mongoSanitize(req.body.email);
  
  req.session.user = user;
  const sessionId = req.session.id;

  const userRole = await Role.findOne({ name: 'user'});

  const newperson = new Person({
    name: name,
    email: email,
    password: hashedPassword,
    roles : [userRole._id]
  });
  await newperson.save();
  id = newperson._id;
  
  try{
  const token = jwt.sign({ sessionId }, process.env.JWT_SECRET, { expiresIn: 3600 });
  res.json({ token, id });
} catch (err) {
  res.status(500).json({ message: err.message });
}
})




router.post('/signup/admin', async (req, res) => {
  const name  =  mongoSanitize(req.body.name);
  
  const user = await Person.findOne({ email: req.body.email });
  if (!user){
    var email =  mongoSanitize(req.body.email);
  }

  const pass = mongoSanitize(req.body.password);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  const adminKey = mongoSanitize(req.body.adminKey);
  if(!adminKey){
    console.log("message : 404");
  }
  if (adminKey === process.env.ADMIN_KEY)
  console.log("message : Right"); 
  
  req.session.user = user;
  var sessionId = req.session.id;

  const adminRole = await Role.findOne({ name: 'admin' });
 
  const newperson = new Person({
    name: name,
    email: email,
    password: hashedPassword,
    roles : [adminRole._id]
  });
    await newperson.save();
    id = newperson._id;
    try{
  const token = jwt.sign({ sessionId }, process.env.JWT_SECRET, { expiresIn: 3600 });
  res.json({ token, id });
} catch (err) {
  res.status(500).json({ message: err.message });
}

})

router.post('/login/user', async (req, res) => {
 
const userRole = await Role.findOne({name: 'user'});
const user = await Person.findOne({ email: req.body.email, roles: [userRole._id] });
  
const isMatch = await bcrypt.compare(req.body.password, user.password);
if (!isMatch) return res.status(400).send({ error: 'Email or password is invalid' });
if (!isMatch){
console.log("password is invalid");}
else{console.log("password is correct");}
    
const id = user._id; 
  
req.session.user = user;
const sessionID = req.session.id;
 
   try {
     const token = jwt.sign({ sessionID }, 'secret', { expiresIn: '1h' });
     res.json({ token,id});
     console.log(token);
   } catch (err) {
     res.status(500).json({ message: err.message });
     console.log("No token");
   }
 });

 router.post('/login/admin', async (req, res) => {
  
  const adminRole = await Role.findOne({name: 'admin'});
  const admin = await Person.findOne({ email: req.body.email, roles: [adminRole._id] });
  const adminKey = await req.body.adminKey;
  if(adminKey === process.env.ADMIN_KEY) return res.status(200).send({ message : 'Admin key is Okay'})
  const isMatch = await bcrypt.compare(req.body.password, admin.password);
  if (!isMatch) return res.status(400).send({ error: 'Email or password is invalid' });
  if (!isMatch){
  console.log("password is invalid");}
  else{console.log("password is correct");}
  req.session.user = admin;
  const sessionID = req.session.id;
  const id = admin._id;
  try {
    const token = jwt.sign({ sessionID }, 'secret', { expiresIn: '1h' });
    res.json({ token, id });
    console.log(token);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("No token");
  }
});

router.get('/users', async (req , res) => {
  const userRole = await Role.findOne({name: 'user'});
  const users = await Person.find({roles: [userRole._id]});
  res.json(users);
})

router.get('/users/:id', async (req , res) => {
  const id = req.params.id;
  const users = await Person.findOne({ _id : id });
  if(!users) return res.status(404).send({error: 'User not found' })
  res.json(users);
})

router.get('/admin/:id', async (req , res) => {
  const id = req.params.id;
  const user = await Person.findOne({_id : id});
  if(!user) return res.status(404).send({error: 'User not found' })
  const name = user.name;
  
  res.json(name);
})

router.delete('/users/:id', async (req, res) => {
  Person.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');
    res.send('User deleted');
  })
});

router.delete('/admin/:id', async (req, res) => {
  Person.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('Admin not found');
    res.send('Admin deleted');
  })
});

app.use("/", router);

app.listen(port, () => {
  console.log('Server listening on port' + " " + port);
});


