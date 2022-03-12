const result = $('.result:first')
const list = $('ol')
const total = $('.total')
const input = $('input')
const select = $('select')
const percentageBtn = $(".percentage-btn")
let acumulator = 0
let multiRollCounter = 0

function clean() { // Função de limpeza. Não funciona no botao %
    $(result).empty()
    $(list).empty()
    $(total).empty()
    select[0].value = 'd4'
    input[0].value = 'placeholder'
    acumulator = 0
}

function randomNumber(diceValue) { // Gera número aleatório.
    return Math.floor(Math.random() * diceValue + 1)
}

function showResult(diceRoll) { // Carrega o resultado da rolagem no local específico.
    result.text(diceRoll)
}

function addHistoryElement(diceValue, diceRoll) { // Cria e adiciona os list itens no histórico.
    let newRoll = $(`<li>d${diceValue} &#9755; ${diceRoll}</li>`)
    if (list[0].childElementCount > 49) $(list).empty()
    list.append(newRoll)
}

function totalSum(diceValue, diceRoll) { // Controla o somatório de rolagens.
    if (diceValue === 20) return
    acumulator = acumulator += diceRoll
    total.html(acumulator)
    console.log('totalSum', diceValue)
}

function luckyNumber() { // Rola duas vezes e seleciona o maior valor. Domínio da sorte.
    const selectValue = $('select')[0].value.split('d')[1]
    const value_1 = randomNumber(selectValue)
    const value_2 = randomNumber(selectValue)
    const max = Math.max(value_1, value_2)
    $('.result:first').html(`<h4>${value_1} | ${value_2}</h4> <h2>${max}</h2>`)
    addHistoryElement(selectValue, max)
    console.log(value_1, value_2, selectValue)
}


function multiRoll(diceValue, diceRoll) { // Rola repetidamente o dado selecionado.
    if (input[0].value > 50) alert('Máx 50')
    for (multiRollCounter; multiRollCounter < input[0].value; multiRollCounter++) {
        let diceRoll = randomNumber(diceValue)
        addHistoryElement(diceValue, diceRoll)
        totalSum(diceValue, diceRoll)
    }
    multiRollCounter = 0
}

function callMedia(diceValue, diceRoll) { // Exibe gifs específicos de acordo com o valor da rolagem.
    if (diceValue != 20) return
    switch (diceRoll) {
        case 1:
            $('.failure-gif').css({ 'visibility': 'visible' })
            $('.sucess-gif').css({ 'visibility': 'hidden' })
            $('.d20-gif').css({ 'visibility': 'hidden' })
            break
        case 20:
            $('.sucess-gif').css({ 'visibility': 'visible' })
            $('.failure-gif').css({ 'visibility': 'hidden' })
            $('.d20-gif').css({ 'visibility': 'hidden' })
            break
        default:
            $('.d20-gif').css({ 'visibility': 'visible' })
            $('.failure-gif').css({ 'visibility': 'hidden' })
            $('.sucess-gif').css({ 'visibility': 'hidden' })
    }
}

($('.dice-container').children().click(e => { // Event listener dos dados comuns.
    const diceValue = parseInt(e.target.attributes.dicevalue.value)
    let diceRoll = randomNumber(diceValue)
    showResult(diceRoll)
    callMedia(diceValue, diceRoll)
    addHistoryElement(diceValue, diceRoll)
    totalSum(diceValue, diceRoll)
    console.log(e.target.attributes.dicevalue.value)
}))

$('.lucky-roll').click(e => { // Event listener do Domínio da Sorte.
    luckyNumber()
})

$('.clean').click(e => { // Event listener da função de limpeza.
    clean()
})

$('button[type=submit]').click(e => { // Event listener da função de multi-rolagem
    const diceValue = parseInt($('select')[0].value.split('d')[1])
    let diceRoll = randomNumber(diceValue)
    multiRoll(diceValue, diceRoll)
    console.log(diceValue, input[0].value)
})

let colorInc = 100 / 3;

$(function()
{
  $("#percent-box").click(function()
  {
    $(this).select();
  });
  
  $(".green").click(function()
  {
    let val = Math.floor(Math.random() * 100 + 1)
    
    if(val != ""
      && !isNaN(val)
      && val <= 100
      && val >= 0)
    {
      console.log(val);
      
      let valOrig = val;
      val = 100 - val;
      
      if(valOrig == 0)
      {
        $("#percent-box").val(0);
        $(".progress .percent").text(0 + "%");
      }
      else $(".progress .percent").text(valOrig + "%");
      
      $(".progress").parent().removeClass();
      $(".progress .water").css("top", val + "%");
      
      if(valOrig < colorInc * 1)
        $(".progress").parent().addClass("red");
      else if(valOrig < colorInc * 2)
        $(".progress").parent().addClass("orange");
      else
        $(".progress").parent().addClass("green");
    }
    else
    {
      $(".progress").parent().removeClass();
      $(".progress").parent().addClass("green");
      $(".progress .water").css("top", 100 - 67 + "%");
      $(".progress .percent").text(67 + "%");
      $("#percent-box").val("");
    }
  });
});