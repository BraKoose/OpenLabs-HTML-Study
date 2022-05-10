const express = require('express');

const morgan = require('morgan');

const mongoose = require('mongoose')


//create app 

const app = express();


//connect to mongoDB 
const dbURI = 'mongodb+srv://makekoose:Dobetter$$$2022@cluster0.giein.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI)


//register view engine
app.set('view engine', 'ejs');


//listen for req

app.listen(7676, () => {
    console.log('listening on port 127.0.0.1:7676')
});


//middleware and static files
app.use(express.static('public'))

app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log('new resquest mode');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('Method:', req.method);
    next();
});

app.get('/', (req, res) => {
    //  res.send('<p>Home Page</p>')

    const blogs = [
        {
            title: "Yougest Entreprenuer gets fund", snippet: "Bra Koose, CEO of 404 solutions is considered as the youngest entreprenuer with a massive market cap of 900M in 2years of being in Business"
        },
        {
            title: "Best App of the Year", snippet: "Trotro Live emerges as the best citizen app in Ghana approved by Google"
        },

        {
            title: "The founder of Trotro Live a FreeMason ?", snippet: "Bra Koose, CEO of 404 solutions is considered a Devil worshipper ?"
        }
    ]
    res.render('index', { title: 'Home', blogs })

});

app.get('/about', (req, res) => {
    //  res.send('<p>Home Page</p>')
    res.render('about', { title: 'About' })

});

//redirects 
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a Blog' });
})

//404 Pages ablways at the bottom of the routing 
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })

});