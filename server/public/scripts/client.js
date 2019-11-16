$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    clearInput();
    $(`#clear`).on(`click`, clearInput);
    $(`.num-btn`).on(`click`, assignNumbers);
    $(`.op-btn`).on(`click`, assignOp);
    $(`#equals`).on(`click`, sendSolution);
    $(`#equals`).on(`click`, clearArrays);
}

let num1 = [];
let num2 = [];
let operator = [];

function clearInput(){
    $.ajax({
        type:`POST`,
        url: `/reset`
    }).then(function(response){
        num1 = [];
        num2 = [];
        operator = [];
        $(`#input-field`).val('');
    }).catch(function(err){
        alert(`something went wrong`);
        console.log(err);
    })
}

function clearArrays(){
    num1 = [];
    // num1.push($(`#input-field`).val());
    num2 = [];
    operator = [];
}

function assignNumbers(){
    if(operator.length === 0){
        num1 += $(this).attr(`data-name`);
        $('#input-field').val(num1);
    }
    else{
        num2 +=$(this).attr(`data-name`);
        $('#input-field').val(num1 + operator + num2);
    }
}

function assignOp(){
    if(num1.length !== 0 && operator.length === 0){
        operator = $(this).attr(`data-name`);
        $('#input-field').val(num1 + operator);
    }
}

function sendSolution(){
    let objectToSend = {
        num1: num1,
        num2: num2,
        op: operator
    }
    $.ajax({
        type: `POST`,
        url: `/math`,
        data: objectToSend
    }).then(function(response){
        console.log('in /math POST');
        getSolution();
    }).catch(function(err){
        alert(`something went wrong`);
        console.log(err);
    })
}

function getSolution(){
    $.ajax({
        type: `GET`,
        url: `/math`
    }).then(function(response){
        showSolution(response);
    }).catch(function(err){
        alert(`something went wrong`);
        console.log(err);
    })
}

function showSolution(r){
    let el = $('#input-field');
        el.empty();
        el.val('');
        el.val(r);
        nums = [];
}

function getHistory(){
    let el = $(`#history`);
    el.empty();
    for(let i=0; i<)
    el.append(`<li class`)
}