// creating separate div boxes for each value in calculator

let parentDiv = document.getElementById('id_number_container');
let char_arr = [7,8,9,'+',4,5,6,'-',1,2,3,'*','c',0,'=','/'];
char_arr.forEach((char) => {
    let elem = document.createElement('button');
    elem.setAttribute('data-value',`${char}`);
    elem.setAttribute('class','btn');
    elem.innerHTML = char;
    parentDiv.appendChild(elem);
})
let numbers_arr = [];
let operators_arr = [];
let final_expression = [];

document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display-value');
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            let display_val = document.querySelector('.display-value').innerHTML;
            console.log(display_val,"---display_val");
            const value = event.target.getAttribute('data-value');
            console.log(display,"--display")
            if (value == '0' || value == '1' || value == '2' || value == '3' || value == '4'
            || value == '5' || value == '6' || value == '7' || value == '8' || value == '9') 
            {
                if (final_expression.length > 0 && display_val > 0)
                {
                    display.textContent = 0;
                    display_val = 0;
                }
                else if (display_val == 0 || display_val.includes('+') || display_val.includes('-') 
                || display_val.includes('*') || display_val.includes('/'))
                    display.textContent = value;
                else {
                    display.textContent = (display_val*10) + parseInt(value);
                }
            }
            else if (value == 'c') {
                display.textContent = 0;
                display_val = 0;
            }
            else if (value == '+' || value == '-' || value == '*' || value == '/') {
                if (display_val == 0) {

                }
                else{
                    if (display_val.slice(-1) == '+' || display_val.slice(-1) == '-' ||
                    display_val.slice(-1) == '*' || display_val.slice(-1) == '/')
                    {

                    }
                    else {
                        console.log(display.textContent,"--------+")
                        numbers_arr.push(display.textContent);
                        operators_arr.push(value);
                        display.textContent += value;
                        console.log(numbers_arr,"--> array", operators_arr, "==> operators arr");
                    }
                }
            }
            else if (value == '=') {
                let total = 0;
                numbers_arr.push(display.textContent);
                console.log(numbers_arr,"--> array", operators_arr, "==> operators arr");
                for (i = 0; i < numbers_arr.length; i++)
                {
                    final_expression.push(numbers_arr[i]);
                    if (i < operators_arr.length)
                        {
                            final_expression.push(operators_arr[i]);
                        }
                }
                function calculate(a, operator, b) {
                    switch (operator) {
                        case '+':
                            return parseInt(a) + parseInt(b);
                        case '-':
                            return parseInt(a) - parseInt(b);
                        case '*':
                            return parseInt(a) * parseInt(b);
                        case '/':
                            return parseInt(a) / parseInt(b);
                        default:
                            throw new Error('Unsupported operator: ' + operator);
                    }
                }
                for (let i = 0; i < final_expression.length; i++) {
                    if (final_expression[i] === '*' || final_expression[i] === '/') {
                        const result = calculate(final_expression[i - 1], final_expression[i], final_expression[i + 1]);
                        final_expression.splice(i - 1, 3, result);
                        i -= 1; // Adjust index to account for removed elements
                    }
                }
            
                // Second pass: handle addition and subtraction
                for (let i = 0; i < final_expression.length; i++) {
                    if (final_expression[i] === '+' || final_expression[i] === '-') {
                        const result = calculate(final_expression[i - 1], final_expression[i], final_expression[i + 1]);
                        final_expression.splice(i - 1, 3, result);
                        i -= 1; // Adjust index to account for removed elements
                    }
                }
                console.log(final_expression,"---resultt")
                display.textContent = final_expression[0];
                numbers_arr.splice(0, numbers_arr.length);
                operators_arr.splice(0, operators_arr.length);
                final_expression.splice(0, 1);
            }
        })
    })
})