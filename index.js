import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;
var pass = "";
var authorised = false;

app.use(bodyParser.urlencoded({extended : true}));

function PasswordGeter(req,res,next){
    console.log(req.body);
    pass = req.body["password"];
    if(pass === "ILoveProgramming"){
        authorised = true;
    }
    next();
}

app.use(PasswordGeter);

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check",(req,res)=>{
    if(authorised){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.sendFile(__dirname + "/public/index.html")
    }
})


app.listen(port,()=>{
    console.log(`You in port no: ${port}`);
})