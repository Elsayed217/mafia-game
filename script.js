
let playersCount = 0;

let mafiaIndex = -1;

let previousMafia = -1;

let activeCard = null;

let timer = null;


// بدء اللعبة

function startGame() {

    playersCount = Number(
        document.getElementById("playersCount").value
    );

    if (playersCount < 3 || playersCount > 20) {
        alert("عدد اللاعبين يجب أن يكون من 3 إلى 20");
        return;
    }

    previousMafia = -1;

    document.getElementById("startScreen").classList.add("hidden");

    document.getElementById("gameScreen").classList.remove("hidden");

    createGame();
}


// إنشاء اللعبة والبطاقات

function createGame() {

    clearTimeout(timer);

    activeCard = null;

    let players = document.getElementById("playersContainer");

    players.innerHTML = "";

    // اختيار المافيا عشوائياً

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * playersCount);
    } while (randomIndex === previousMafia);

    mafiaIndex = randomIndex;

    // إنشاء بطاقات اللاعبين

    for (let i = 0; i < playersCount; i++) {

        let card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>👤 اللاعب ${i + 1}</h3>
            <p>اضغط للكشف</p>
        `;

        card.onclick = function() {
            revealCard(card, i);
        };

        players.appendChild(card);

    }

}


// إظهار دور اللاعب

function revealCard(card, index) {

    // إغلاق البطاقة السابقة

    clearTimeout(timer);

    if (activeCard !== null) {

        activeCard.className = "card";

        activeCard.innerHTML = `
            <h3>👤 اللاعب السابق</h3>
            <p>اضغط للكشف</p>
        `;

    }

    activeCard = card;

    // معرفة دور اللاعب

    if (index === mafiaIndex) {

        card.className = "card revealed mafia";

        card.innerHTML = `
            <h3>🔴 مافيا</h3>
            <p>أنت المافيا!</p>
        `;

    } else {

        card.className = "card revealed salah";

        card.innerHTML = `
            <h3>🟢 صالح</h3>
            <p>أنت صالح</p>
        `;

    }

    // إغلاق البطاقة بعد 5 ثوانٍ

    timer = setTimeout(function() {

        card.className = "card";

        card.innerHTML = `
            <h3>👤 اللاعب ${index + 1}</h3>
            <p>اضغط للكشف</p>
        `;

        activeCard = null;

    }, 1000);

}


// إعادة اللعب

function restartGame() {

    previousMafia = -1;

    createGame();

}
