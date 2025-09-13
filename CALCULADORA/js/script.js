// --- 1. SELECCIÓN DE ELEMENTOS DEL DOM --- 
// Usamos 'const' porque estos elementos no cambiarán. 
const pantalla = document.querySelector('.pantalla'); 
const botones = document.querySelectorAll('.btn'); // Seleccionamos TODOS los botones 
// --- 2. VARIABLES DE ESTADO DE LA CALCULADORA --- 
// Usamos 'let' porque sus valores cambiarán durante el uso. 
let displayValue = '0';      
// Valor que se muestra en la pantalla. 
let primerOperando = null;   // Almacena el primer número de una operación. 
let operador = null;        
 // Almacena el operador (+, -, *, /). 
let esperandoSegundoOperando = false; // Un 'flag' para saber si ya se ingresó el primer número y un operador. 
// --- 3. FUNCIÓN PRINCIPAL PARA ACTUALIZAR LA PANTALLA --- 
function actualizarPantalla() { 
pantalla.textContent = displayValue; 
} 
// Inicializamos la pantalla al cargar la página. 
actualizarPantalla(); 
// --- 4. MANEJO DE EVENTOS DE CLIC --- 
// Recorremos todos los botones y le agregamos un 'escuchador' de eventos de clic a cada uno. 
botones.forEach(boton => { 
boton.addEventListener('click', () => { 
const valorBoton = boton.textContent; // Obtenemos el texto del botón (ej: '7', '+', 'C') 
// Usamos una estructura 'switch' para decidir qué hacer según el tipo de botón. 
if (boton.classList.contains('operador')) { 
manejarOperador(valorBoton); 
} else if (boton.classList.contains('igual')) { 
manejarIgual(); 
} else if (boton.classList.contains('clear')) { 
reiniciarCalculadora(); 
} else if (valorBoton === '.') { 
inputDecimal(valorBoton); 
} else { 
inputNumero(valorBoton); 
} 
actualizarPantalla(); // Actualizamos la pantalla después de cada acción. 
}); 
}); 

// --- 5. FUNCIONES LÓGICAS --- 
function inputNumero(numero) { 
    // Si estamos esperando el segundo número, limpiamos la pantalla antes de mostrar el nuevo número. 
    if (esperandoSegundoOperando) { 
        displayValue = numero; 
        esperandoSegundoOperando = false; 
    } else { 
        // Si el valor actual es '0', lo reemplazamos. Si no, lo concatenamos. 
        displayValue = displayValue === '0' ? numero : displayValue + numero; 
    } 
} 

function inputDecimal(punto) { 
    // Si estamos esperando un nuevo número, empezamos con "0." 
    if (esperandoSegundoOperando) { 
        displayValue = '0.'; 
        esperandoSegundoOperando = false; 
        return; 
    } 
    // Añade el punto decimal solo si no existe ya uno. 
    if (!displayValue.includes(punto)) { 
        displayValue += punto; 
    } 
} 

function manejarOperador(proximoOperador) { 
    const valorActual = parseFloat(displayValue); 
 
    // Si ya tenemos un operador y estamos esperando el segundo número, no hacemos nada hasta que se presione igual. 
    if (operador && esperandoSegundoOperando) { 
        operador = proximoOperador; 
        return; 
    } 
 
    // Si no hay un primer operando, el número actual en pantalla se convierte en el primero. 
    if (primerOperando === null) { 
        primerOperando = valorActual; 
    } else if (operador) { 
        // Si ya existe un operador, realizamos el cálculo pendiente. 
        const resultado = calcular(primerOperando, valorActual, operador); 
        displayValue = `${parseFloat(resultado.toFixed(7))}`; // Mostramos el resultado y lo preparamos para la siguiente operación. 
        primerOperando = resultado; 
    } 
 
    esperandoSegundoOperando = true; 
    operador = proximoOperador; 
} 

function calcular(primero, segundo, op) { 
    if (op === '+') return primero + segundo; 
    if (op === '-') return primero - segundo; 
    if (op === '*') return primero * segundo; 
    if (op === '/') return primero / segundo; 
    return segundo; 
} 

function manejarIgual() { 
    // Solo calcula si hay un primer operando y un operador definidos. 
    if (primerOperando === null || operador === null) { 
        return; 
    } 
    // Caso especial: división por cero 
    if (operador === '/' && displayValue === '0') { 
        displayValue = 'Error'; 
        setTimeout(reiniciarCalculadora, 1500); // Se reinicia después de 1.5s 
        return; 
    } 
 
    const segundoOperando = parseFloat(displayValue); 
    const resultado = calcular(primerOperando, segundoOperando, operador); 
 
    displayValue = `${parseFloat(resultado.toFixed(7))}`; // Usamos toFixed para limitar decimales. 
    primerOperando = null; // Reiniciamos para la próxima operación. 
    operador = null; 
    esperandoSegundoOperando = false; 
} 

function reiniciarCalculadora() { 
    displayValue = '0'; 
    primerOperando = null; 
    operador = null; 
    esperandoSegundoOperando = false; 
}
 
// --- 5. FUNCIONES LÓGICAS --- 
 
function inputNumero(numero) { 
    // Si estamos esperando el segundo número, limpiamos la pantalla antes de mostrar el nuevo número. 
    if (esperandoSegundoOperando) { 
        displayValue = numero; 
        esperandoSegundoOperando = false; 
    } else { 
        // Si el valor actual es '0', lo reemplazamos. Si no, lo concatenamos. 
        displayValue = displayValue === '0' ? numero : displayValue + numero; 
    } 
} 
 
function inputDecimal(punto) { 
    // Si estamos esperando un nuevo número, empezamos con "0." 
    if (esperandoSegundoOperando) { 
        displayValue = '0.'; 
        esperandoSegundoOperando = false; 
        return; 
    } 
    // Añade el punto decimal solo si no existe ya uno. 
    if (!displayValue.includes(punto)) { 
        displayValue += punto; 
    } 
} 
 
function manejarOperador(proximoOperador) { 
    const valorActual = parseFloat(displayValue); 
 
    // Si ya tenemos un operador y estamos esperando el segundo número, no hacemos nada hasta que se presione igual. 
    if (operador && esperandoSegundoOperando) { 
        operador = proximoOperador; 
        return; 
    } 
 
    // Si no hay un primer operando, el número actual en pantalla se convierte en el primero. 
    if (primerOperando === null) { 
        primerOperando = valorActual; 
    } else if (operador) { 
        // Si ya existe un operador, realizamos el cálculo pendiente. 
        const resultado = calcular(primerOperando, valorActual, operador); 
        displayValue = `${parseFloat(resultado.toFixed(7))}`; // Mostramos el resultado y lo preparamos para la siguiente operación. 
        primerOperando = resultado; 
    } 
 
    esperandoSegundoOperando = true; 
    operador = proximoOperador; 
} 
 
function calcular(primero, segundo, op) { 
    if (op === '+') return primero + segundo; 
    if (op === '-') return primero - segundo; 
    if (op === '*') return primero * segundo; 
    if (op === '/') return primero / segundo; 
    return segundo; 
} 
 
function manejarIgual() { 
    // Solo calcula si hay un primer operando y un operador definidos. 
    if (primerOperando === null || operador === null) { 
        return; 
    } 
    // Caso especial: división por cero 
    if (operador === '/' && displayValue === '0') { 
        displayValue = 'Error'; 
        setTimeout(reiniciarCalculadora, 1500); // Se reinicia después de 1.5s 
        return; 
    } 
 
    const segundoOperando = parseFloat(displayValue); 
    const resultado = calcular(primerOperando, segundoOperando, operador); 
 
    displayValue = `${parseFloat(resultado.toFixed(7))}`; // Usamos toFixed para limitar decimales. 
    primerOperando = null; // Reiniciamos para la próxima operación. 
    operador = null; 
    esperandoSegundoOperando = false; 
} 
 
function reiniciarCalculadora() { 
    displayValue = '0'; 
    primerOperando = null; 
    operador = null; 
    esperandoSegundoOperando = false; 
} 