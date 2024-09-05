document.addEventListener('DOMContentLoaded', function () {
  const display = document.getElementById('display');
  const history = document.getElementById('history');
  const buttons = document.querySelectorAll('button');
  let currentInput = '';
  let operator = null;
  let firstOperand = null;
  let resultDisplayed = false;

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const value = this.textContent;

      if (this.classList.contains('number') || this.classList.contains('decimal')) {
        if (resultDisplayed) {
          currentInput = '';
          resultDisplayed = false;
        }

        if (value === '.' && currentInput.includes('.')) return;

        currentInput += value;
        display.value = currentInput;

      } else if (this.classList.contains('operator')) {
        if (currentInput !== '') {
          firstOperand = parseFloat(currentInput);
          operator = value;
          history.textContent = currentInput + ' ' + operator;
          currentInput = '';
        }

      } else if (this.classList.contains('equal')) {
        if (operator && currentInput !== '') {
          const secondOperand = parseFloat(currentInput);

          if (operator === '/' && secondOperand === 0) {
            display.value = 'Error: Division by zero';
            history.textContent = '';
            currentInput = '';
            operator = null;
            firstOperand = null;
            resultDisplayed = false;
            return;
          }

          let result;
          switch (operator) {
            case '+':
              result = firstOperand + secondOperand;
              break;
            case '-':
              result = firstOperand - secondOperand;
              break;
            case '*':
              result = firstOperand * secondOperand;
              break;
            case '/':
              result = firstOperand / secondOperand;
              break;
            default:
              result = secondOperand;
          }

          display.value = result;
          history.textContent += ' ' + currentInput + ' = ' + result;
          currentInput = result.toString();
          operator = null;
          firstOperand = null;
          resultDisplayed = true;
        }

      } else if (this.classList.contains('clear')) {
        clearCalculator();

      } else if (this.classList.contains('backspace')) {
        if (resultDisplayed) {
          clearCalculator();
        } else {
          currentInput = currentInput.slice(0, -1);
          display.value = currentInput;
        }
      }
    });
  });

  function clearCalculator() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    display.value = '';
    history.textContent = '';
    resultDisplayed = false;
  }

  document.addEventListener('keydown', function (e) {
    const key = e.key;

    if (!isNaN(key) || key === '.') {
      if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
      }

      if (key === '.' && currentInput.includes('.')) return;

      currentInput += key;
      display.value = currentInput;
    } else if (['+', '-', '*', '/'].includes(key)) {
      if (currentInput !== '') {
        firstOperand = parseFloat(currentInput);
        operator = key;
        history.textContent = currentInput + ' ' + operator;
        currentInput = '';
      }
    } else if (key === 'Enter' || key === '=') {
      if (operator && currentInput !== '') {
        const secondOperand = parseFloat(currentInput);

        if (operator === '/' && secondOperand === 0) {
          display.value = 'Error: Division by zero';
          history.textContent = '';
          currentInput = '';
          operator = null;
          firstOperand = null;
          resultDisplayed = false;
          return;
        }

        let result;
        switch (operator) {
          case '+':
            result = firstOperand + secondOperand;
            break;
          case '-':
            result = firstOperand - secondOperand;
            break;
          case '*':
            result = firstOperand * secondOperand;
            break;
          case '/':
            result = firstOperand / secondOperand;
            break;
          default:
            result = secondOperand;
        }

        display.value = result;
        history.textContent += ' ' + currentInput + ' = ' + result;
        currentInput = result.toString();
        operator = null;
        firstOperand = null;
        resultDisplayed = true;
      }
    } else if (key === 'Backspace') {
      if (resultDisplayed) {
        clearCalculator();
      } else {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
      }
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
      clearCalculator();
    }
  });
});
