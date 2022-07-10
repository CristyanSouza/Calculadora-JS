const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')

const buttons = document.querySelectorAll('button')

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ''
  }

  //Add digit to calculator screen
  addDigit(digit) {
    if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
      return
    }
    this.currentOperation = digit
    this.updateScreen()
  }

  //Process operations
  processOperation(operation) {
    if (this.currentOperationText.innerText === '' && operation !== 'C') {
      if (this.previousOperationText.innerText !== '') {
        this.changeOperation(operation)
      }
      return
    }
    
    let operationValue
    let previous = +this.previousOperationText.innerText.split(' ')[0]
    let current = +this.currentOperationText.innerText

    switch (operation) {
      case '+':
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '-':
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '*':
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '/':
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case 'DEL':
        this.delLastDigit()
        break
      case 'CE':
        this.clearCurrentOperation()
        break
      case 'C':
        this.clearAllOperations()
        break
      case '=':
        this.equalButton()
        break
      default:
        return
    }
  }

  //Change Values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation
    } else {
      if (previous === 0) {
        operationValue = current
      }
      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = ''
    }
  }

  //Change math operation
  changeOperation(operation) {
    const mathOperations = ['*', '/', '+', '-']

    if (!mathOperations.includes(operation)) {
      return
    }
    this.previousOperationText.innerText =
    this.previousOperationText.innerText.slice(0, -1) + operation
  }

  delLastDigit() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1)
  }

  clearCurrentOperation() {
    this.currentOperationText.innerText = ''
  }

  clearAllOperations() {
    this.currentOperationText.innerText = ''
    this.previousOperationText.innerText = ''
  }

  equalButton() {
    const operator = previousOperationText.innerText.split(" ")[1]

    this.processOperation(operator)
  }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach(btn => {
  btn.addEventListener('click', e => {
    const value = e.target.innerText

    if (+value >= 0 || value === '.') {
      calc.addDigit(value)
    } else {
      calc.processOperation(value)
    }
  })
})
