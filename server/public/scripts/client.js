$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    $('#plus-sign').on(`click`, setFirstNum);
    $('#minus-sign').on(`click`, setFirstNum);
    $('#multi-sign').on(`click`, setFirstNum);
    $('#division-sign').on(`click`, setFirstNum);
    $('#equals-sign').on(`click`, compute);
}

let nums = [];
let operator = [];

function setFirstNum(){
    console.log('in setFirstNum');
    nums.push($(`#num1-in`).val());
    operator = $(this).attr(`data-name`);
}

function compute(){
    console.log('in compute');
    nums.push($(`#num2-in`).val());
    let objectToSend = {
        num1: nums[0],
        num2: nums[1],
        op: operator
    }
    $.ajax({
        type: `POST`,
        url: `/math`,
        data: objectToSend
    }).then(function(response){
        console.log('in /math POST');
        appendStuff();
    }).catch(function(err){
        alert(`something went wrong`);
        console.log(err);
    })
}

function appendStuff(){
    $.ajax({
        type: `GET`,
        url: `/math`
    }).then(function(response){
        let el = $('#total');
        el.empty();
        el.append(`<p>${response}</p>`);
        nums = [];
    })
}