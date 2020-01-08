$(function(){
    clearInput();
    getHistory();
    $(`#clear`).on(`click`, clearInput);
    $(`.num-btn`).on(`click`, assignNumbers);
    $(`.op-btn`).on(`click`, assignOp);
    $(`#equals`).on(`click`, sendSolution);
    $(`#delete`).on(`click`, deleteHistory);
    $(`#appendHistory`).on(`click`, `.list-item`, getFromHistory);
    $(`#backspace`).on(`click`, backSpace);
});

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
    let data = $(this).attr(`data-name`);
    if(total.length !== 0 && operator.length === 0){
        num1 = [];
        total = [];

        if(data === '0' && num1.length === 0){}
        else{
            num1 += data;
            $('#input-field').val(num1);
        }
    }
    else{
        if(operator.length === 0 && num1.length < 10){

            if(num1.includes(`.`) && data === `.`){}
            else{

                if(data === '0' && num1.length === 0){}
                else{
                    num1 += data;
                    $('#input-field').val(num1);
                }
            }
        }
        else if(operator.length !== 0 && num2.length < 10){

            if(num2.includes(`.`) && data === `.`){}
            else{

                if(data === '0' && num2.length === 0){}
                else{
                    num2 += data;
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
    let el = $('#input-field')
    if(operator.length === 0 && num1.length > 0){
        num1 = num1.substring(0, num1.length-1);
        el.val(num1);  
    }
    else if(operator.length !== 0 && num2.length === 0){
        operator = operator.substring(0, operator.length-1);
        el.val(num1 + operator);
    }
    else if(num2.length > 0){
        num2 = num2.substring(0, num2.length-1); 
        el.val(num1 + operator + num2);
    }
}

function clearAllArrays(){
    $.ajax({
        type:`POST`,
        url: `/reset`
    }).then(function(response){
        clearThreeArrays();
    }).catch(function(error){
        alert(`error resetting numbers`);
        console.log(error);
    });
}

function clearInput(){
    $.ajax({
        type:`POST`,
        url: `/reset`
    }).then(function(response){
        clearThreeArrays();
        $(`#input-field`).val('');
    }).catch(function(error){
        alert(`error clearing display`);
        console.log(error);
    });
}

function clearThreeArrays(){
    num1 = [];
    num2 = [];
    operator = [];
}

function clearTwoArrays(){
    num2 = [];
    operator = [];
}

function deleteHistory(){
    $.ajax({
        type:'DELETE',
        url: '/history'
    }).then(function(response){
        getHistory();
    }).catch(function(error){
        alert('error removing history');
        console.log(error);
    });
}

function getFromHistory(){
    let index = $(this).data('index');
    $.ajax({
        type:'GET',
        url: `/history/${index}`
    }).then(function(response){
        viewFromHistory(response);
    }).catch(function(error){
        alert('error retrieving from history');
        console.log(error);
    });
}

function getHistory(){
    $.ajax({
        type: `GET`,
        url: `/history`
    }).then(function(response){
        appendHistory(response);
    }).catch(function(error){
        alert(`error displaying history`);
        console.log(error);
    });
}

function getSolution(){
    $.ajax({
        type: `GET`,
        url: `/result`
    }).then(function(response){
        showSolution(response);
    }).catch(function(error){
        alert(`error calculating result`);
        console.log(error);
    });
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
            getSolution();
            clearTwoArrays();
            getHistory();
        }).catch(function(error){
            alert(`error sending equation`);
            console.log(error);
        });
    }      
}

function showSolution(r){
    let el = $('#input-field');
    el.empty();
    el.val(Math.round((+r + 0.00001) * 100) / 100);
    total = r;
    num1 = r;
}

function viewFromHistory(r){
    let el = $('#input-field');
    el.empty();
    el.val(r);
    clearAllArrays();
}
