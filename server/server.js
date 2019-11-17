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
    res.sendStatus(200);
})

app.post(`/reset`, (req, res)=>{
    console.log('in /reset POST');
    num = [];
    result = [];
    res.sendStatus(200);
})

app.get(`/math`, (req, res)=>{
    console.log('in /math GET');
    res.send(result);
})

app.get(`/result`, (req, res)=>{
    console.log('in /result GET');
    res.send(result);
})

app.get(`/history`, (req, res)=>{
    console.log('in /history GET');
    res.send(history);
})

app.get(`/history/:index`, (req, res)=>{
    console.log('in from /history GET', req.params.index);
    res.send(history[req.params.index]);
})

app.delete('/history', (req, res)=>{
    console.log('in /messages DELETE');
    history = [];
    res.send('deleted');
})

function doMath(op){
    result = [];
    switch(op){
        case '+':
            console.log('num1', num[0]);
            console.log('num2', num[1]);
            result.push(+num[0] + +num[1]);
            history.push(`${+num[0]} + ${+num[1]} = ${result}`);
            break;
        case '-':
            result.push(+num[0] - +num[1]);
            history.push(`${+num[0]} - ${+num[1]} = ${result}`);
            break;
        case '*':
            result.push(+num[0] * +num[1]);
            history.push(`${+num[0]} * ${+num[1]} = ${result}`);
            break;
        case '/':
            result.push(+num[0] / +num[1]);
            history.push(`${+num[0]} / ${+num[1]} = ${result}`);
            break;
    }
    num = [];
}