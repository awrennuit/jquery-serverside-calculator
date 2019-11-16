$(document).ready(onReady);

function onReady(){
//     console.log('JQ');
//     $('#plus-sign').on(`click`, setFirstNum);
//     $('#minus-sign').on(`click`, setFirstNum);
//     $('#multi-sign').on(`click`, setFirstNum);
//     $('#division-sign').on(`click`, setFirstNum);
//     $('#equals-sign').on(`click`, sendEquation);
//     getResult();
//     getHistory();
    clearInput();
    $(`#clear`).on(`click`, clearInput);
    $('.num-btn').on('click', assignNumbers);
    $('.op-btn').on('click', assignOp);
    $(`#equals`).on(`click`, sendSolution);
}

// let nums = [];
// let operator = [];

// function setFirstNum(){
//     console.log('in setFirstNum');
//     nums.push($(`#num1-in`).val());
//     operator = $(this).attr(`data-name`);
// }

// function sendEquation(){
//     console.log('in compute');
//     nums.push($(`#num2-in`).val());
//     let objectToSend = {
//         num1: nums[0],
//         num2: nums[1],
//         op: operator
//     }
//     $.ajax({
//         type: `POST`,
//         url: `/math`,
//         data: objectToSend
//     }).then(function(response){
//         console.log('in /math POST');
//         appendResult();
//         getHistory();
//     }).catch(function(err){
//         alert(`something went wrong`);
//         console.log(err);
//     })
// }

// function getResult(){
//     $.ajax({
//         type: `GET`,
//         url: `/math`
//     }).then(function(response){
//         appendResult(response);
//     }).catch(function(err){
//         alert(`something went wrong`);
//         console.log(err);
//     })
// }

// function appendResult(r){
//     let el = $('#total');
//         el.empty();
//         el.append(`<p>${r}</p>`);
//         nums = [];
// }

// function getHistory(){
//     console.log('in appendHistory');
//     $.ajax({
//         type: `GET`,
//         url: `/result`
//     }).then(function(response){
//         console.log('appending history');
//         appendHistory(response);
//     }).catch(function(err){
//         alert(`something went wrong`);
//         console.log(err);
//     })
// }

// function appendHistory(r){
//     let el = $('#history');
//         el.empty();
//         for(let i=0; i<r.length; i++){
//             el.append(`<li class="list-item" data-index="${i}">${r[i]}</li>`);
//         }
// }

let num1 = [];
let num2 = [];
let operator = [];

function clearInput(){
    $(`#input-field`).val('');
}

function assignNumbers(){
    if(operator.length === 0){
        num1 += $(this).attr(`data-name`);
        $('#input-field').val(num1);
        console.log('num1:', num1);
    }
    else{
        num2 +=$(this).attr(`data-name`);
        $('#input-field').val(num1 + operator + num2);
        console.log('num2:', num2);
    }
}

function assignOp(){
    if(operator.length === 0){
        operator = $(this).attr(`data-name`);
        $('#input-field').val(num1 + operator);
        console.log('operator:', operator);
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

    }).catch(function(err){
        alert(`something went wrong`);
        console.log(err);
    })
}