const express = require ('express');
const path = require('path');
const app = express();
const hbs=require ('hbs');
const mongoose = require('mongoose')
const {check}=require("express-validator")
const bodyParser = require('body-parser')
const authController = require ("./authController")
const port = 3563
const authRouter = require('./authRouter')
app.use('/', express.static(path.join(__dirname, 'views')));
app.use(express.json())
app.use("/auth", authRouter)
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.get('/', (req, res) => {
    const isLogin = !!req.headers.cookie?.split('; ')?.find(e => e.startsWith('token='));
    if (isLogin==true){
        res.render(path.join(__dirname, 'views','mainPage.hbs'))
    }
    else{
        res.redirect('/login')
    }
});

app.get('/register', (req, res) => {
    const isLogin = !!req.headers.cookie?.split('; ')?.find(e => e.startsWith('token='));
    if (isLogin==true){
        res.redirect('/')
    }
    else{
        res.render(path.join(__dirname, 'views','index.hbs'), { isRegister: true })
    }
   
});

app.get('/login', (req, res) => {
    const isLogin = !!req.headers.cookie?.split('; ')?.find(e => e.startsWith('token='));
    if (isLogin==true){
        res.redirect('/')
    }
    else{
        res.render(path.join(__dirname, 'views','index.hbs'), { isLogin: true })
    }
});
app.post('/login', authController.login)

app.post('/register', authController.registration)
    



app.get('/catalog', (req,res)=>{

    res.render((path.join(__dirname, 'views','catalog.hbs')))
});

app.get('/form', (req,res)=>{

    res.render((path.join(__dirname, 'views','form.hbs')))
});



app.get('/mainPage', (req,res)=>{

    res.render(path.join(__dirname, 'views','mainPage.hbs'))
});


const start =async () =>{
    try{
        await mongoose.connect('mongodb+srv://nikitakhodov0:rainwrld@cluster0.sieyy6o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        app.listen(port, '127.0.0.1', ()=>{
            console.log('Server has start on http://localhost:%d', port)
        });
    } catch (e){
        console.log(e)
    }
}



// const storage = multer.diskStorage({
//     destination: function (req, file, cb){
//         return cb(null, "files")
//     },
//     filename: function(req,file,cb){
//         return cb(null, `${file.originalname}`)
//     }
// });

// const upload = multer({storage:storage});



// app.post("/views/archive.hbs", upload.single("filedata"), function(req, res, next){
//     let filedata = req.file;
//     if(!filedata) res.send("Ошибка при загрузке");
//     else
//     res.render('archive.hbs', {
//         title: 'АРХИВ',
//         btnName: "Загрузить"
//     })
    
// })

// app.use ('/archive', (_,res)=>{
//     res.render ('archive.hbs', {
//         title: 'АРХИВ',
//         btnName: "Загрузить"
//     })
// })




 


// app.use('/profile', (_, res)=>{
//     res.render('profile.hbs')
// });


start()




