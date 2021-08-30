const express = require ('express');
const mongoose = require('mongoose');
const axios = require("axios").default;
const blogroute = require('./routes/blogroutes');
const app = express();
const dbURI = 'mongodb+srv://Ahmad:1234@cluster0.zuwe4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

app.set('view engine' , 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use('/blogs',blogroute);


app.get('/',(req,res)=>
{
   res.redirect('/blogs')
});

app.get('/data',(req,res)=>
{
  res.render('data',{country:'select country' ,confirmed: ' ' , recovered: ' ', deaths: ' ',title:'data'});
});

app.get('/about',(req,res)=>
{
    res.render('about',{title:'about'});
});

app.post('/data',(req,res)=>
{
  var country = req.body.selector;
  var options = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/country',
    params: {name: country},
    headers: {
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      'x-rapidapi-key': 'fa114f0c46msh3c84282564bd876p19fd1djsn70215dc8ecc5'
    }
  };
  axios.request(options).then(function (response) {
    res.render('data',{country:response.data[0].country , confirmed:response.data[0].confirmed , recovered: response.data[0].recovered
      ,deaths:response.data[0].deaths ,title:'data'});
  }).catch(function (error) {
    console.error(error);
  });

});

app.use((req,res)=>
{
    res.status(404).render('404',{title:'404'});
});




