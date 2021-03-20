const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const routes = require("./app/routes/routes");
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aditya:aaryan2197@cluster0.pkpwp.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false});


mongoose.connection.on('connected', err => {
  console.log("a");  
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

routes(app);

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
  next();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})