import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const loading = document.getElementById('loading');

function showLoading() {
    loading.classList.remove('d-none');
}

function hideLoading() {
    loading.classList.add('d-none');
}

window.appendToDisplay = (value) => {
    display.value += value;
};

window.clearDisplay = () => {
    display.value = '';
};

window.calculate = async () => {
    const expression = display.value;
    if (!expression) return;

    const [num1, operator, num2] = expression.split(/([+\-*/])/);

    if (!num1 || !operator || !num2) {
        alert('Invalid expression');
        return;
    }

    showLoading();

    try {
        let result;
        switch (operator) {
            case '+':
                result = await backend.add(parseFloat(num1), parseFloat(num2));
                break;
            case '-':
                result = await backend.subtract(parseFloat(num1), parseFloat(num2));
                break;
            case '*':
                result = await backend.multiply(parseFloat(num1), parseFloat(num2));
                break;
            case '/':
                result = await backend.divide(parseFloat(num1), parseFloat(num2));
                break;
        }
        display.value = result.toString();
    } catch (error) {
        console.error('Calculation error:', error);
        alert('An error occurred during calculation');
    } finally {
        hideLoading();
    }
};
