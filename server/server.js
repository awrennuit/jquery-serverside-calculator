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
});

app.post(`/math`, (req, res)=>{
    num.push(req.body.num1);
    num.push(req.body.num2);
    doMath(req.body.op);
    res.sendStatus(200);
});

app.post(`/reset`, (req, res)=>{
    num = [];
    result = [];
    res.sendStatus(200);
});

app.get(`/result`, (req, res)=>{
    res.send(result);
});

app.get(`/history`, (req, res)=>{
    res.send(history);
});

app.get(`/history/:index`, (req, res)=>{
    res.send(history[req.params.index]);
});

app.delete('/history', (req, res)=>{
    history = [];
    res.sendStatus(200);
});

function doMath(op){
    result = [];
    switch(op){
        case '+':
            result.push(+num[0] + +num[1]);
            history.push(`${+num[0]} + ${+num[1]} = ${Math.round((+result + 0.00001) * 100) / 100}`);
            break;
        case '-':
            result.push(+num[0] - +num[1]);
            history.push(`${+num[0]} - ${+num[1]} = ${Math.round((+result + 0.00001) * 100) / 100}`);
            break;
        case '*':
            result.push(+num[0] * +num[1]);
            history.push(`${+num[0]} * ${+num[1]} = ${Math.round((+result + 0.00001) * 100) / 100}`);
            break;
        case '/':
            result.push(+num[0] / +num[1]);
            history.push(`${+num[0]} / ${+num[1]} = ${Math.round((+result + 0.00001) * 100) / 100}`);
            break;
    }
    num = [];
}
