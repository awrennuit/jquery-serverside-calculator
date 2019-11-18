$(document).ready(onReady);

function onReady(){
    clearInput();
    getHistory();
    $(`#clear`).on(`click`, clearInput);
    $(`.num-btn`).on(`click`, assignNumbers);
    $(`.op-btn`).on(`click`, assignOp);
    $(`#equals`).on(`click`, sendSolution);
    $(`#delete`).on(`click`, deleteHistory);
    $(`#appendHistory`).on(`click`, `.list-item`, getFromHistory);
    $(`#backspace`).on(`click`, backSpace);
}

let num1 = [];
let num2 = [];
let operator = [];
let total = [];

function appendHistory(r){
    let el = $('#appendHistory');
        el.empty();
        for(let i=0; i<r.length; i++){
            el.append(`<li class="list-item" data-index="${i}">${r[i]}</li>`);
        }
}

function assignNumbers(){
    if(total.length !== 0 && operator.length === 0){
        num1 = [];
        total = [];
        if($(this).attr(`data-name`) === '0' && num1.length === 0){
        }
        else{
            num1 += $(this).attr(`data-name`);
            $('#input-field').val(num1);
        }
    }
    else{
        if(operator.length === 0 && num1.length < 10){
            if(num1.includes(`.`) && $(this).attr(`data-name`) === `.`){
            }
            else{
                if($(this).attr(`data-name`) === '0' && num1.length === 0){
                }
                else{
                    num1 += $(this).attr(`data-name`);
                    $('#input-field').val(num1);
                }
            }
        }
        else if(operator.length !== 0 && num2.length < 10){
            if(num2.includes(`.`) && $(this).attr(`data-name`) === `.`){
            }
            else{
                if($(this).attr(`data-name`) === '0' && num2.length === 0){
                }
                else{
                    num2 +=$(this).attr(`data-name`);
                    $('#input-field').val(num1 + operator + num2);
                }
            }
        }
    } 
}

function assignOp(){
    if(num1.length !== 0 && operator.length === 0){
        operator = $(this).attr(`data-name`);
        $('#input-field').val(num1 + operator);
    }
}

function backSpace(){
    if(operator.length === 0){
        num1 = num1.substr(0, num1.length-1);
        $('#input-field').val(num1);  
    }
    else if(operator.length !== 0 && num2.length === 0){
        operator = operator.substr(0, operator.length-1);
        $('#input-field').val(num1 + operator); 

    }
    else{
        num2 = num2.substr(0, num2.length-1); 
        $('#input-field').val(num1 + operator + num2);
    }
}

function clearAllArrays(){
    $.ajax({
        type:`POST`,
        url: `/reset`
    }).then(function(response){
        console.log('in /reset POST');
        num1 = [];
        num2 = [];
        operator = [];
    }).catch(function(err){
        alert(`something went wrong`);
        console.log(err);
    })
}

function clearArrays(){
    num2 = [];
    operator = [];
}

function clearInput(){
    $.ajax({
        type:`POST`,
        url: `/reset`
    }).then(function(response){
        console.log('in /reset POST');
        num1 = [];
        num2 = [];
        operator = [];
        $(`#input-field`).val('');
    }).catch(function(err){
        alert(`something went wrong`);
        console.log(err);
    })
}

function deleteHistory(){
    $.ajax({
        type:'DELETE',
        url: '/history'
    }).then(function(response){
        console.log('in /history DELETE');
        getHistory();
    }).catch(function(err){
        alert('something went wrong');
        console.log(err);
    })
}

function getFromHistory(){
    let index = $(this).data('index');
    $.ajax({
        type:'GET',
        url: '/history/' + index
    }).then(function(response){
        console.log('in from /history GET');
        viewFromHistory(response);
    }).catch(function(err){
        alert('something went wrong');
        console.log(err);
    })
}

function getHistory(){
    $.ajax({
        type: `GET`,
        url: `/history`
    }).then(function(response){
        console.log('in /history GET');
        appendHistory(response);
    }).catch(function(err){
        alert(`something went wrong`);
        console.log(err);
    })
}

function getSolution(){
    $.ajax({
        type: `GET`,
        url: `/result`
    }).then(function(response){
        console.log('in /result GET');
        showSolution(response);
    }).catch(function(err){
        alert(`something went wrong`);
        console.log(err);
    })
}

function sendSolution(){
    if(num1.length > 0 && operator.length > 0 && num2.length > 0){
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
            clearArrays();
            getHistory();
        }).catch(function(err){
            alert(`something went wrong`);
            console.log(err);
        })
    }      
}

function showSolution(r){
    let el = $('#input-field');
        el.empty();
        el.val(r);
        total = r;
        num1 = r;
}

function viewFromHistory(r){
    let el = $('#input-field');
    el.empty();
    el.val(r);
    clearAllArrays();
}