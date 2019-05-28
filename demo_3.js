//ECMA SCRIPT 6
class Sqr { // класс представляющий клеточку
    ind;
    row;
    col;
    hiddenColor; // спрятанный цвет заданный случайным образом
    color; // "class" attribute in html, изначально задан white
    setColor(colr) {
        this.color = colr;
        document.getElementById(this.ind).setAttribute("class", colr);
    };
}

// Создадим массив цветов с индексами
const colorArr = {1: "pink", 2: "blue", 3: "green", 4: "cyan", 5: "darkviolet", 6: "red", 7: "yellow", 8: "orange"};
//Создадим массив индексов для цветов и перемешаем его
let colorIdxRandomly = [1, 2, 3, 4, 5, 6, 7, 8];
shuffleArray(colorIdxRandomly);
// создадим массивы индексов для клеточек и перемешаем
let squareRowIdxRandomly = [1, 2, 3, 4];
let squareColIdxRandomly = [1, 2, 3, 4];
shuffleArray(squareRowIdxRandomly);
shuffleArray(squareColIdxRandomly);
// Инициализируем двумерный массив клеточек и назначим им индексы.
let sqrArray = new Array(4);
for (let i = 0; i < 4; i++) {
    sqrArray[i] = new Array(4);
}
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        let sqr = new Sqr();
        sqr.ind = i + "" + j;
        sqr.row = i;
        sqr.col = j;
        sqr.color = "white";
        sqrArray[i][j] = sqr;
    }
}
// Зададим произвольные цвета произвольным парам клеточек
cir = 0;
let t = true;
let sqrIdxArr = ["00", "01", "02", "03", "10", "11", "12", "13", "20", "21", "22", "23", "30", "31", "32", "33"];
shuffleArray(sqrIdxArr);
for (let i = 0; i < sqrIdxArr.length; i++) {
    let r = sqrIdxArr[i].substring(0, 1);
    let c = sqrIdxArr[i].substring(1, 2);
    sqrArray[r][c].hiddenColor = colorArr[colorIdxRandomly[cir]];
    if (t) {
        t = false;
    } else {
        cir++;
        t = true;
    }
}
let victoryIdx = 0;
let selectedColor;
let selectedIdx;
let gameStarted = false;
let timerStarted = false;
let timer;

// срабатывает при нажатии на клеточку
function clickN(s) {
    if (!gameStarted) {
        return;
    }
    let i = s.substring(0, 1);
    let j = s.substring(1, 2);
    let sqrSel = sqrArray[i][j];
    if (selectedColor !== undefined) { // выберается вторая клеточка
        if (sqrSel.hiddenColor === selectedColor & sqrSel.ind !== selectedIdx) {
            selectedIdx = sqrSel.ind;
            selectedColor = sqrSel.hiddenColor;
            sqrSel.setColor(sqrSel.hiddenColor);
            selectedColor = undefined;
            victoryIdx += 1;
            if (victoryIdx === sqrIdxArr.length) {
                doVin();
            }
        } else { // обновим поле если второй раз нажата клетка с другим цветом
            let board = document.getElementsByClassName("board");
            board[0].innerHTML = tbody_standard;
            selectedColor = undefined;
            selectedIdx = undefined;
            victoryIdx = 0;
        }
    } else { // первое нажатие
        selectedColor = sqrSel.hiddenColor;
        sqrSel.setColor(sqrSel.hiddenColor);
        selectedIdx = sqrSel.ind;
        victoryIdx += 1;
    }
}

function shuffleArray(array) {
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * array.length);
        let m = array[i];
        let n = array[j];
        array[j] = m;
        array[i] = n;
    }
}

// срабатываеит при нажатии Играть
function play() {
    if (gameStarted) {
        return;
    }
    gameStarted = true;
    timerStarted = true;
    startTimer();
}

// вызывается при завершении игры когда открыты все пары клеточек
function doVin() {
    alert("Вы выиграли!" + "\n" + "Затраченное время: " + document.getElementById("minutes").innerText + ":" + document.getElementById("seconds").innerText);
    stopTimer();
}


function startTimer() {
    if (!timerStarted) {
        return;
    }
    let minutes = 0;
    let seconds = 0;
    timer = setInterval(() => {
        if (!timerStarted) {
            clearInterval(timer);
            return;
        }
        if (seconds < 59) {
            seconds += 1;
        } else {
            seconds = 0;
            minutes += 1;
        }
        minutes < 10 ? document.getElementById("minutes").innerText = "0" + minutes : document.getElementById("minutes").innerText = minutes;
        seconds < 10 ? document.getElementById("seconds").innerText = "0" + seconds : document.getElementById("seconds").innerText = seconds;
    }, 1000);
}

function stopTimer() {
    timerStarted = false;
    clearInterval(timer);
}

// служит для обновсления клеточек при выборе не правильной скрытой пары
const tbody_standard = "<tbody>\n" +
    "    <tr>\n" +
    "        <td class=\"white\" onclick=\"clickN('00')\" id=\"00\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('01')\" id=\"01\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('02')\" id=\"02\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('03')\" id=\"03\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td class=\"white\" onclick=\"clickN('10')\" id=\"10\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('11')\" id=\"11\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('12')\" id=\"12\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('13')\" id=\"13\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td class=\"white\" onclick=\"clickN('20')\" id=\"20\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('21')\" id=\"21\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('22')\" id=\"22\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('23')\" id=\"23\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td class=\"white\" onclick=\"clickN('30')\" id=\"30\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('31')\" id=\"31\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('32')\" id=\"32\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('33')\" id=\"33\"></td>\n" +
    "    </tr>\n" +
    "    </tbody>";