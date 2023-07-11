const container = document.querySelector(".js-content");
// console.log(container);

// створюємо гравця першого "X"
let player = "X";

//створюємо історію ходів гравців

let historyPlayerX = [];
let historyPlayerO = [];

// Ініціалізація всіх можливих віграшних комбінацій
const winsConbination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

//створюємо розмітку ігри для HTML, та вставляємо її у розмітку в DOM

function createMarkup() { 
    let markup = "";
    for (let i = 1; i < 10; i += 1) { 
        markup += `<div class="item js-item" data-id="${i}"></div>`;
    }

    container.innerHTML = markup;
}
createMarkup();

// Слухаємо подію клику на ігрове поле

container.addEventListener('click', onClick);

function onClick(evt) { 

    //деструктуризація таргета з евенту
    const { target } = evt;
    // перевірка - якщо ефргут (тобто те по чому жмакнули) не містить класс js-item или там вже є тектовий контент - вийди з функції
    //це робимо для того щоб по перше взаємодія відбувалася тільки по ігровому полю, та не було перезапису значення кліку
    //тобто ми не могли х змінити на 0
    if (!target.classList.contains('js-item') || target.textContent) { 
        return;
    }
    //для запису історії ходів гравців нам потрібно знати іd поле гравців - цу наше i, знаходиться у дата сет атрибуті у розмітці
//дата сет завжди даэ строкуБ нам треба рядок привести до числа
    const id = Number(target.dataset.id);
    // console.log(id);

    //формуємо історію ходів гравців. для цього пушимо іd у масиви історій ходів

    if (player === 'X') {
        historyPlayerX.push(id);
        result = isWinner(historyPlayerX);
    } else {
        historyPlayerO.push(id);
        result = isWinner(historyPlayerO);
    }

    //arr = це масиви ходів(історія) наших гравців
    //Функція визначення переможця
    function isWinner(arr) { 
        return winsConbination.some((item) => item.every((id) => arr.includes(id)))
    }
     if (result) {
        console.log(`Виграв ${player}`);
        resetGame();
        return
    } else if (historyPlayerX.length + historyPlayerO.length === 9) { 
        console.log("Спробуйте ще");
        resetGame();
        return
    }

    //визначаємо текстовий контент ігрових полів
    target.textContent = player;
    // зробили перехід ходу
    player = player === "X" ? "O" : "X";

   

    //Оновлення гри =
    //1. Нова розмітка
    //2. Очищення історії ходів гравцв
    //3. ініціалізація гравця -першого
    function resetGame() { 
        createMarkup();
        historyPlayerX = [];
        historyPlayerO = [];
        player = "X";
    }
}


