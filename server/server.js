const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

let num = [];
let result = [];
let history = [];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, ()=>{
    console.log('server up on', port);
})

app.post(`/math`, (req, res)=>{
    console.log('in /math POST');
    num.push(req.body.num1);
    num.push(req.body.num2);
    doMath(req.body.op);
    console.log('result:', result);
    res.sendStatus(200);
})

app.get(`/math`, (req, res)=>{
    console.log('in /math GET');
    res.send(result);
})

function doMath(op){
    result = [];
    switch(op){
        case 'add':
            result.push(+num[0] + +num[1]);
            history.push(`${+num[0]} + ${+num[1]} = ${result}`);
            break;
        case 'sub':
            result.push(+num[0] - +num[1]);
            history.push(`${+num[0]} - ${+num[1]} = ${result}`);
            break;
        case 'multi':
            result.push(+num[0] * +num[1]);
            history.push(`${+num[0]} * ${+num[1]} = ${result}`);
            break;
        case 'div':
            result.push(+num[0] / +num[1]);
            history.push(`${+num[0]} / ${+num[1]} = ${result}`);
            break;
    }
}