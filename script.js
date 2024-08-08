function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function deleteLastCharacter() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById('display');
    let expression = display.value;

    // Substituir os símbolos pelos correspondentes JavaScript
    expression = expression.replace(/√/g, 'Math.sqrt(');
    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/log/g, 'Math.log10');
    expression = expression.replace(/sin/g, 'Math.sin(');
    expression = expression.replace(/cos/g, 'Math.cos(');
    expression = expression.replace(/tan/g, 'Math.tan(');
    expression = expression.replace(/π/g, 'Math.PI');
    expression = expression.replace(/e/g, 'Math.E');

    // Adicionar parênteses de fechamento para funções matemáticas
    expression = balanceParentheses(expression);

    console.log('Expression:', expression); // Log da expressão para verificação

    try {
        // Avaliar a expressão
        const result = eval(expression);
        if (result === Infinity || result === -Infinity || isNaN(result)) {
            throw new Error('Math error');
        }
        display.value = result;
    } catch (e) {
        display.value = 'Error';
        console.error('Calculation Error:', e); // Log de erro para depuração
    }
}

function balanceParentheses(expr) {
    // Contar parênteses de abertura e fechamento
    let openCount = 0;
    let balancedExpr = '';

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            openCount++;
        } else if (expr[i] === ')') {
            if (openCount > 0) {
                openCount--;
            } else {
                continue; // Ignorar parênteses fechados extras
            }
        }
        balancedExpr += expr[i];
    }

    // Adicionar parênteses de fechamento se necessário
    balancedExpr += ')'.repeat(openCount);

    return balancedExpr;
}
