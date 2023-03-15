const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const User = require('./models/formModel');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const crudRoutes = require("./routes/crudRoutes");
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const paidRoutes = require('./routes/paidRoutes');
const updateLogRoutes = require('./routes/updateLogRoutes');


const incomeCategoryRoutes = require('./routes/incomeCategoryRoutes');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');



const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());


app.post('/authenticate', async (req, res) => {
    try {
        
        const { email, password } = req.body;
        if (!(email && password)) return "email or password cannot be empty!";
        const user = await User.find({});
        
        for(let i=0;i<user.length;i++){
            if (user[i].email === email && user[i].password === password) {
              const tokenPayload = {
                email,
                timestamp: Date.now() // Add a timestamp to the payload
              };
              
              const token = jwt.sign(tokenPayload, 'secret');
                res.status(200).json({ token });
            }        
        }
        
    } catch (err) {
        console.log(err.message);
    }
});
app.use(express.json());

app.use('/api/expense', expenseRoutes);
app.use('/api/paid', paidRoutes);
app.use('/api/updatelog', updateLogRoutes);


app.use('/api/category', categoryRoutes);
app.use('/api/incomeCategory', incomeCategoryRoutes);


app.use('/',express.static('uploads'))



app.use("/api/cruds", crudRoutes);

app.get('/home', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("authHeader");

      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        console.log("err");
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
      // token is valid, proceed with request
      res.status(200).json({ message: 'Welcome to the home page' });
    });
  });

app.listen(5000, () => {
    console.log("server started at 5000");
});