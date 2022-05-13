let leftCurrency = 'RUB'
let rightCurrency = 'USD'

let leftCost = 0;
let rightCost = 0;

let leftToRight = 0
let rigthToLeft = 0

let leftInput = document.querySelector('.left-side-input')
let rightInput = document.querySelector('.right-side-input')

leftInput.value = leftCost
rightInput.value = rightCost

let leftButtons = document.querySelectorAll('.left-side-choice')
let rightButtons = document.querySelectorAll('.right-side-choice')

let leftInfo = document.querySelector('.left-side-info')
let rightInfo = document.querySelector('.right-side-info')

function reloadCurrencies(left, right, callBack) {
    if (left != right) {
        fetch(`https://api.exchangerate.host/latest?base=${left}&symbols=${right}`)
            .then(response => {
                response.json().then(data => {
                    leftToRight = data.rates[right]
                    leftInfo.innerHTML = `1 ${left} = ${leftToRight} ${right}`
                    if(callBack) callBack()
                }).catch(e => {
                    alert('Problem Occured :(')
                })
            })
        fetch(`https://api.exchangerate.host/latest?base=${right}&symbols=${left}`)
            .then(response => {
                response.json().then(data => {
                    rigthToLeft = data.rates[left]
                    rightInfo.innerHTML = `1 ${right} = ${rigthToLeft} ${left}`
                    if(callBack) callBack()
                }).catch(e => {
                    alert('Problem Occured :(')
                })
            })
    }
    else {
        rightInput.value = leftInput.value
        leftInfo.innerHTML = `1 ${left} = 1 ${right}`
        rightInfo.innerHTML = `1 ${right} = 1 ${left}`
    }
}

function setButtonColors(leftCurrency, rightCurrency) {
    for (let i = 0; i < leftButtons.length; i++) {
        if (leftButtons[i].value === leftCurrency) {
            leftButtons[i].style.color = '#fff'
            leftButtons[i].style.background = '#833AE0'
        } else {
            leftButtons[i].style.background = '#fff'
            leftButtons[i].style.color = '#C6C6C6'
        }
    }
    for (let i = 0; i < rightButtons.length; i++) {
        if (rightButtons[i].value === rightCurrency) {
            rightButtons[i].style.color = '#fff'
            rightButtons[i].style.background = '#833AE0'
        } else {
            rightButtons[i].style.background = '#fff'
            rightButtons[i].style.color = '#C6C6C6'
        }
    }
}


function calculateLeft() {
    rightCost = rightInput.value
    rightInput.value = Number(rightInput.value.replace(',', '.'))
    leftInput.value = (Number(rigthToLeft) * Number(rightCost)).toFixed(4)
}

function calculateRight() {
    leftCost = leftInput.value
    leftInput.value = Number(leftInput.value.replace(',', '.'))
    rightInput.value = (Number(leftToRight) * Number(leftCost)).toFixed(4)
}

setButtonColors(leftCurrency, rightCurrency)
reloadCurrencies(leftCurrency, rightCurrency)

for (let i = 0; i < leftButtons.length; i++) {
    leftButtons[i].addEventListener('click', () => {
        leftCurrency = leftButtons[i].value
        reloadCurrencies(leftCurrency, rightCurrency, calculateLeft)
        setButtonColors(leftCurrency, rightCurrency)
    })
}

for (let i = 0; i < rightButtons.length; i++) {
    rightButtons[i].addEventListener('click', () => {
        rightCurrency = rightButtons[i].value
        reloadCurrencies(leftCurrency, rightCurrency, calculateRight)
        setButtonColors(leftCurrency, rightCurrency)
    })
}

leftInput.addEventListener('input', () => {
    leftCost = leftInput.value
    leftInput.value = leftCost
    rightInput.value = (Number(leftToRight) * Number(leftCost.replace(',', '.'))).toFixed(4)
})

rightInput.addEventListener('input', () => {
    rightCost = rightInput.value
    rightInput.value = rightCost
    leftInput.value = (Number(rigthToLeft) * Number(rightCost.replace(',', '.'))).toFixed(4)
})