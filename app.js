const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const exphbs=require('express-handlebars');
const path=require('path');
const port = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname,'public')));
//Body Parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//Set view Engine
const {GenerateDate}=require('./helpers/handlebars-helpers');
app.engine('handlebars',exphbs({defaultLayout:'home',allowedProtoMathods:{trim:true},helpers:{GenerateDate:GenerateDate}}));
app.set('view engine','handlebars');



const home=require('./routes/home/index');
app.use('/',home);


app.listen(port,()=>{
    console.log('listening on port:' + port);
});
module.exports=app;
