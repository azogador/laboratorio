"use strict";

// CONFIGURACIÓN DOCENTE:
// false = pruebas sin espera; true = clase, 30 segundos antes de COMPROBAR.
const CONTADOR_ACTIVO = false;
const SEGUNDOS_ESPERA = 30;

const DESAFIOS = [
  {
    titulo: "La computadora saluda", contexto: "Cuando conocemos a alguien, solemos empezar por saludar. Una computadora también puede mostrar un saludo.",
    teoria: "La instrucción print() muestra un texto en pantalla. Los textos van entre comillas.", ejemplo: 'print("Hola")',
    mision: 'Escribí un programa que muestre exactamente: Hola, clase', pista: 'Probá con print("Hola, clase"). Prestá atención a las mayúsculas y a la coma.',
    inicio: '# Mi primer saludo\nprint("Hola")',
    validar: ({lineas}) => lineas.length === 1 && lineas[0] === 'Hola, clase', consejo: 'La consola debe mostrar Hola, clase en una línea.'
  },
  {
    titulo: "Un cartel para la merienda", contexto: "Un cartel anuncia qué habrá para merendar. Podés mostrar información usando varias instrucciones.",
    teoria: "Python ejecuta las instrucciones de arriba hacia abajo. Cada print() puede mostrar una línea diferente.", ejemplo: 'print("Hoy")\nprint("Merienda")',
    mision: 'Mostrá dos líneas en este orden: primero Merienda y después Fruta. Cambiá las instrucciones que haga falta.', pista: 'Eliminá Hoy y agregá una instrucción para mostrar Fruta.',
    inicio: 'print("Hoy")\nprint("Merienda")',
    validar: ({lineas}) => JSON.stringify(lineas) === JSON.stringify(['Merienda','Fruta']), consejo: 'Necesitás dos líneas: Merienda y Fruta, en ese orden.'
  },
  {
    titulo: "Una etiqueta con nombre", contexto: "Imaginá una caja que lleva una etiqueta. La etiqueta nos permite encontrar lo que guardamos dentro. Así podemos imaginar una variable.",
    teoria: "¿QUÉ ES UNA VARIABLE?\nUna variable es un lugar donde la computadora guarda un valor. Tiene un nombre (como la etiqueta de una caja) para que podamos usar ese valor después.\n\n¿QUÉ SIGNIFICA ASIGNAR?\nEl signo = permite asignar: guardar en la variable de la izquierda el valor que está a la derecha. En nombre = \"Ana\", nombre es la variable y \"Ana\" es el texto que guardamos. Las comillas indican que se trata de texto.\n\n¿QUÉ MUESTRA PRINT?\nprint(nombre) muestra el contenido de la variable: Ana. No muestra la palabra nombre.\n\n¿PUEDE CAMBIAR?\nSí. Si después escribimos nombre = \"Carmen\", la misma variable guarda otro valor y print(nombre) muestra Carmen.",
    ejemplo: 'nombre = "Ana"\nprint(nombre)\n\n# Podemos cambiar lo que guarda:\nnombre = "Carmen"\nprint(nombre)',
    mision: 'Modificá el valor de la variable nombre para que la consola muestre Carmen. Conservá print(nombre).', pista: 'Cambiá solamente el texto entre comillas de la variable nombre.',
    inicio: 'nombre = "Ana"\nprint(nombre)',
    validar: ({lineas,codigo}) => lineas.length === 1 && lineas[0] === 'Carmen' && /\bnombre\s*=/.test(codigo) && /print\s*\(\s*nombre\s*\)/.test(codigo), consejo: 'La salida debe ser Carmen y provenir de la variable nombre.'
  },
  {
    titulo: "¿Cuánto cuesta la compra?", contexto: "En el almacén comprás un pan de 30 pesos y un paquete de galletitas de 45 pesos. ¿Cuánto gastaste?",
    teoria: "LOS OPERADORES MATEMÁTICOS\nPython también sirve para hacer cálculos. Utilizamos símbolos llamados operadores:\n+ suma (10 + 5 → 15)\n- resta (10 - 5 → 5)\n* multiplica (10 * 5 → 50)\n/ divide (10 / 5 → 2.0)\n\n¡Atención! Para multiplicar usamos * y para dividir usamos /. Los números no llevan comillas.\n\nOPERACIONES CON VARIABLES\nPodemos calcular utilizando los números guardados en variables. En el ejemplo, precio guarda 30, cantidad guarda 2 y print(precio * cantidad) muestra 60.\n\nPara sumar el pan y las galletitas, pensá qué operador necesitás y escribí una instrucción print() que use las dos variables. No hace falta crear una variable nueva.",
    ejemplo: 'precio = 30\ncantidad = 2\nprint(precio * cantidad)',
    mision: 'Usá las variables pan y galletitas para sumar sus precios y mostrar el total en la consola.', pista: 'Usá + dentro de print(), con pan y galletitas. No necesitás crear otra variable.',
    inicio: 'pan = 30\ngalletitas = 45\n\n# Escribí una instrucción print() para mostrar el total',
    validar: ({lineas,codigo}) => lineas.length === 1 && lineas[0] === '75' && /\b(?:pan\s*\+\s*galletitas|galletitas\s*\+\s*pan)\b/.test(codigo) && /print\s*\(/.test(codigo), consejo: 'Mostrá 75 con print() y una suma entre las variables pan y galletitas.'

  },
  {
    titulo: "Un mensaje personalizado", contexto: "Queremos que el programa use el nombre de una persona para darle la bienvenida.",
    teoria: "COMBINAR TEXTOS Y VARIABLES\nYa sabés guardar un nombre en una variable. Si hacés print(nombre), se muestra solamente el nombre. ¿Cómo podemos agregar un saludo?\n\nUNA F-STRING\nUna f-string permite mezclar texto escrito por nosotros con el valor de una variable.\n1. La letra f va justo antes de las comillas: f\"...\".\n2. Las comillas indican el comienzo y el final del texto.\n3. Las llaves { } indican dónde queremos colocar el valor de una variable.\n4. En {nombre}, Python busca lo guardado en nombre y lo coloca dentro del saludo.\n\nSi nombre vale \"Sol\", print(f\"Hola, {nombre}\") muestra Hola, Sol. Si cambiamos el valor a \"Pedro\", el mismo mensaje muestra Hola, Pedro. ¡No necesitamos reescribir todo el saludo!",
    ejemplo: 'nombre = "Sol"\nprint(f"Hola, {nombre}")\n\n# Si cambiamos nombre por "Pedro",\n# el saludo cambia automáticamente.',
    mision: 'Tu compañera Carmen llega al salón. Modificá el programa para que muestre exactamente: Bienvenida, Carmen. Conservá la f-string.', pista: 'Cambiá el nombre y la palabra Hola por Bienvenida; dejá {nombre} entre llaves.',
    inicio: 'nombre = "Mateo"\nprint(f"Hola, {nombre}")',
    validar: ({lineas,codigo}) => lineas.length === 1 && lineas[0] === 'Bienvenida, Carmen' && /\bnombre\s*=/.test(codigo) && /\bf["\']/.test(codigo) && /\{nombre\}/.test(codigo), consejo: 'La consola debe mostrar Bienvenida, Carmen usando {nombre} en una f-string.'
  },
  {
    titulo: "La alcancía", contexto: "Tenés 20 pesos ahorrados en una alcancía. Tu abuela te regala otros 15 pesos.",
    teoria: "UNA VARIABLE PUEDE CAMBIAR\nUna variable no tiene por qué conservar siempre el mismo valor. Podemos darle un valor al comienzo y reemplazarlo más adelante.\n\nEn el ejemplo, la variable color guarda primero \"rojo\" y después \"azul\". Cuando usamos print(color), aparece el último valor guardado.\n\nEn tu misión, en vez de reemplazar un texto, necesitás aumentar una cantidad. Recordá que el signo = sirve para guardar un valor y que + sirve para sumar. Pensá cómo podrías utilizar el dinero que ya tenés para calcular el nuevo ahorro.",
    ejemplo: 'color = "rojo"\ncolor = "azul"\nprint(color)',
    mision: 'Completá el programa para agregar los 15 pesos que recibiste y mostrar cuánto dinero tenés ahora.',
    pista: 'El valor de ahorro ya es 20. ¿Cómo podrías calcular el nuevo valor usando el anterior y una suma? Escribí esa actualización antes de print(ahorro).',
    inicio: 'ahorro = 20\n\n# Agregá los 15 pesos que recibiste\n\nprint(ahorro)',
    validar: ({lineas,codigo}) => lineas.length === 1 && lineas[0] === '35' && /\bahorro\s*=\s*20\b/.test(codigo) && /\bahorro\s*=\s*ahorro\s*\+\s*15\b/.test(codigo) && /print\s*\(\s*ahorro\s*\)/.test(codigo),
    consejo: 'Revisá que el valor de ahorro cambie antes de mostrarlo. ¿Qué cantidad debería tener después del regalo?'
  },
  {
    titulo: "¿Cuánto dinero me queda?", contexto: "Tenés 100 pesos y comprás una merienda que cuesta 35 pesos. ¿Cuánto dinero te queda?",
    teoria: "ELEGIR LA OPERACIÓN ADECUADA\nYa conocés las variables y los operadores matemáticos. Antes de programar, conviene leer el problema y decidir qué cálculo necesitamos.\n\nPor ejemplo, si juntamos 20 figuritas con otras 10, podemos mostrar cuántas tenemos en total.\n\nEn tu misión ocurre algo diferente: comenzás con una cantidad de dinero y después gastás una parte. Pensá cuál de los operadores que aprendiste representa esa situación. Usá las variables que aparecen en el editor.",
    ejemplo: 'figuritas = 20\nregalo = 10\nprint(figuritas + regalo)',
    mision: 'Completá el programa para mostrar cuánto dinero te queda después de gastar 35 pesos. La consola debe mostrar 65.',
    pista: '¿El dinero aumenta o disminuye cuando comprás algo? Elegí el operador que corresponda y usá los valores guardados en dinero y gasto.',
    inicio: 'dinero = 100\ngasto = 35\n\n# Escribí la instrucción para mostrar cuánto dinero queda',
    validar: ({lineas,codigo}) => lineas.length === 1 && lineas[0] === '65' && /print\s*\(\s*dinero\s*-\s*gasto\s*\)/.test(codigo),
    consejo: 'El resultado debe ser 65. Revisá qué operación representa gastar dinero y cómo mostrar su resultado.'
  },
  {
    titulo: "Organizamos una merienda", contexto: "Tres compañeros van a compartir una merienda. Cada uno compra un jugo que cuesta 20 pesos. ¿Cuánto gastan entre los tres?",
    teoria: "RESOLVEMOS UN PROBLEMA CONOCIDO\nYa aprendiste a mostrar información con print(), guardar números en variables y elegir operadores matemáticos.\n\nPor ejemplo, podemos calcular cuánto cuestan dos productos diferentes sumando sus precios.\n\nAhora pensá en tu misión: hay varios jugos y todos cuestan lo mismo. ¿Qué operación te permite averiguar el precio de todos juntos? Revisá los operadores que aprendiste en el desafío 4 y utilizá las variables del editor.",
    ejemplo: 'pan = 20\nleche = 40\nprint(pan + leche)',
    mision: 'Utilizá las variables precio y cantidad para mostrar cuánto cuestan los tres jugos. La consola debe mostrar 60.',
    pista: 'Si un jugo cuesta 20 pesos, ¿cómo calcularías el precio de tres jugos iguales? Buscá el operador apropiado antes de escribir print().',
    inicio: 'precio = 20\ncantidad = 3\n\n# Escribí la instrucción para mostrar el gasto total',
    validar: ({lineas,codigo}) => lineas.length === 1 && lineas[0] === '60' && /print\s*\(\s*(?:precio\s*\*\s*cantidad|cantidad\s*\*\s*precio)\s*\)/.test(codigo),
    consejo: 'El resultado debe ser 60. Pensá cómo calcular el precio de varios productos iguales usando las variables.'
  }

];
const $ = id => document.getElementById(id);
let editor;
let pyodide = null;
let indice = 0;
let desbloqueado = 0;
let resultados = new Map();
let ultimo = null;
let temporizador = null;
let inicioDesafio = Date.now();
let ejecutando = false;
let laboratorioFinalizado = false;

function lineasReales(texto) {return texto.trim().split(/\r?\n/).map(x=>x.trim()).filter(x=>x.length > 0);}
function actualizarTemporizador() {
  clearInterval(temporizador);
  function pintar() {
    const restante = CONTADOR_ACTIVO ? Math.max(0, SEGUNDOS_ESPERA - Math.floor((Date.now() - inicioDesafio) / 1000)) : 0;
    $('check-btn').disabled = !pyodide || ejecutando || !ultimo || restante > 0 || resultados.get(indice) === true;
    $('timer-message').textContent = !CONTADOR_ACTIVO ? 'Modo de prueba: espera desactivada.' : restante > 0 ? `Podrás comprobar el desafío en ${restante} segundos. Podés ejecutar mientras tanto.` : 'Ya podés comprobar tu desafío.';
    if (restante <= 0) clearInterval(temporizador);
  }
  pintar();
  if (CONTADOR_ACTIVO) temporizador = setInterval(pintar, 250);
}
function presentarDesafio() {
  const d = DESAFIOS[indice];
  $('challenge-title').textContent = d.titulo;
  $('challenge-context').textContent = d.contexto;
  $('challenge-theory').textContent = d.teoria;
  $('challenge-example').textContent = d.ejemplo;
  $('challenge-instruction').textContent = d.mision;
  $('challenge-hint').textContent = d.pista;
  $('challenge-counter').textContent = `${indice+1} de ${DESAFIOS.length}`;
  $('progress-fill').style.width = `${(indice+1)/DESAFIOS.length * 100}%`;
  $('previous-btn').disabled = indice === 0;
  $('next-btn').disabled = !resultados.get(indice);
  $('next-btn').textContent = indice === DESAFIOS.length - 1 ? '¡Terminado! ✓' : 'Siguiente →';
  $('challenge-feedback').hidden = true;
  document.querySelector('.hint').open = false;
  editor.setValue(d.inicio);
  $('console-output').textContent = 'Tu programa mostrará aquí sus resultados.';
  $('console-output').classList.remove('error');
  $('run-label').textContent = 'Lista para ejecutar';
  ultimo = null;
  inicioDesafio = Date.now();
  actualizarTemporizador();
  setTimeout(()=>editor.refresh(),0);
}
function feedback(tipo, mensaje) {
  let el = $('challenge-feedback');
  el.className = `feedback ${tipo}`;
  el.textContent = mensaje;
  el.hidden = false;
}
async function cargarPython() {
  const estado = $('python-status');
  try {
    if (typeof loadPyodide !== 'function') throw Error('No se pudo descargar el motor de Python.');
    pyodide = await loadPyodide({indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/'});
    estado.textContent = '● Python listo';
    estado.classList.add('ready');
    $('run-btn').disabled = false;
    actualizarTemporizador();
  } catch(e) {
    estado.textContent = '⚠ Python sin conexión';
    estado.classList.add('error');
    $('console-output').textContent = 'No fue posible cargar Python. Verificá la conexión a Internet, recargá la página e intentá nuevamente.\n' + e.message;
    $('console-output').classList.add('error');
  }
}
async function ejecutar() {
  if (!pyodide || ejecutando) return;
  ejecutando = true;
  $('run-btn').disabled = true;
  $('check-btn').disabled = true;
  $('run-label').textContent = 'Ejecutando…';
  const codigo = editor.getValue();
  const stdout = [];
  const stderr = [];
  $('console-output').classList.remove('error');
  try {
    pyodide.setStdout({batched: s => stdout.push(s)});
    pyodide.setStderr({batched: s => stderr.push(s)});
    await pyodide.runPythonAsync(codigo);
    const salida = stdout.join('\n');
    $('console-output').textContent = salida || '(El programa terminó sin mostrar texto.)';
    ultimo = {codigo, lineas: lineasReales(salida), error: false};
    $('run-label').textContent = 'Ejecución terminada';
  } catch(e) {
    $('console-output').classList.add('error');
    $('console-output').textContent = `Error de Python:\n${String(e.message || e)}`;
    $('run-label').textContent = 'Revisá tu código';
    ultimo = {codigo, lineas: [], error: true};
    feedback('warning','Python encontró un error. Leé la consola, revisá los espacios, los paréntesis y las comillas. ¡Probá de nuevo!');
  } finally {
    ejecutando = false;
    $('run-btn').disabled = false;
    actualizarTemporizador();
  }
}
function comprobar() {
  if (!ultimo || ultimo.error || ejecutando || !pyodide) return;
  if (CONTADOR_ACTIVO && Date.now() - inicioDesafio < SEGUNDOS_ESPERA * 1000) return;
  const d = DESAFIOS[indice];
  if (d.validar(ultimo)) {
    resultados.set(indice, true);
    desbloqueado = Math.max(desbloqueado, indice+1);
    if (indice === DESAFIOS.length-1) feedback('success', '¡Excelente! Superaste el último desafío. Presioná «¡Terminado!» para finalizar el laboratorio.');
    else feedback('success', '¡Muy bien! El código produce el resultado esperado. Avanzá al siguiente desafío cuando quieras.');
    $('next-btn').disabled = false;
  } else {
    feedback('warning', 'Todavía hay algo para ajustar. ' + d.consejo + ' Volvé a ejecutar tu código después de modificarlo.');
  }
  actualizarTemporizador();
}
function iniciar() {
  const textarea = $('code-input');
  if (window.CodeMirror) {
    editor = CodeMirror.fromTextArea(textarea, {mode:'python',theme:'material-darker',lineNumbers:true,indentUnit:4,tabSize:4,indentWithTabs:false,lineWrapping:true,extraKeys:{Tab:function(cm){cm.replaceSelection('    ');}}});
  } else {
    textarea.style.cssText='display:block;width:100%;height:290px;padding:16px;background:#0b1325;color:#eaf2ff;border:0;font:15px/1.65 monospace;resize:vertical';
    editor={setValue:s=>textarea.value=s,getValue:()=>textarea.value,on:(name,fn)=>textarea.addEventListener('input',fn),refresh:()=>{}};
  }
  editor.on('change', () => {
    ultimo = null;
    if (pyodide) actualizarTemporizador();
    $('run-label').textContent='Cambios sin ejecutar';
  });
  $('run-btn').addEventListener('click', ejecutar);
  $('check-btn').addEventListener('click', comprobar);
  $('reset-btn').addEventListener('click', () => {
    editor.setValue(DESAFIOS[indice].inicio);
    $('console-output').textContent='Ejemplo restaurado. Ejecutalo cuando quieras.';
    $('console-output').classList.remove('error');
    $('challenge-feedback').hidden=true;
  });
  $('previous-btn').addEventListener('click', () => {if (indice>0) {laboratorioFinalizado = false; indice--;presentarDesafio();}});
  $('next-btn').addEventListener('click', () => {
    if (laboratorioFinalizado) {
      laboratorioFinalizado = false;
      resultados.clear();
      desbloqueado = 0;
      indice = 0;
      presentarDesafio();
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }
    if (!resultados.get(indice)) return;
    if (indice < DESAFIOS.length - 1) {
      indice++;
      presentarDesafio();
    } else {
      feedback('success', '🎉 ¡Laboratorio terminado! Completaste los ocho desafíos y ejecutaste tus primeros programas en Python. ¡Felicitaciones!');
      laboratorioFinalizado = true;
      $('next-btn').textContent = '↻ Volver a empezar';
      $('next-btn').disabled = false;
      $('challenge-title').textContent = '¡Misión cumplida!';
      $('challenge-instruction').textContent = 'Ya aprendiste a mostrar mensajes, trabajar con variables, hacer operaciones y resolver problemas cotidianos en Python. Podés seguir experimentando en el editor o volver a empezar.';
    }
  });
  presentarDesafio();
  cargarPython();
}
window.addEventListener('DOMContentLoaded', iniciar);
