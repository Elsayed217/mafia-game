
let playersCount = 0;

let mafiaIndex = -1;

let currentPlayer = 0;

let timer = null;

let revealed = false;


// بدء اللعبة

function startGame() {

    playersCount = Number(
        document.getElementById("playersCount").value
    );

    if (playersCount < 3 || playersCount > 20) {
        alert("عدد اللاعبين يجب أن يكون من 3 إلى 20");
        return;
    }

    document.getElementById("startScreen").classList.add("hidden");

    document.getElementById("gameScreen").classList.remove("hidden");

    createGame();

}


// إنشاء لعبة جديدة

function createGame() {

    clearTimeout(timer);

    currentPlayer = 0;

    revealed = false;

    mafiaIndex = Math.floor(Math.random() * playersCount);

    showPlayer();

}


// عرض اللاعب الحالي

function showPlayer() {

    let players = document.getElementById("playersContainer");

    players.innerHTML = "";

    document.getElementById("playerTitle").innerText =
        "اللاعب رقم " + (currentPlayer + 1);

    document.getElementById("message").innerText =
        "اضغط على الكارت لمعرفة دورك";

    let card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
        <h3>👤 اللاعب ${currentPlayer + 1}</h3>
        <p>اضغط للكشف</p>
    `;

    card.onclick = function() {
        revealCard(card);
    };

    players.appendChild(card);

}


// إظهار دور اللاعب

function revealCard(card) {

    if (revealed) {
        return;
    }

    revealed = true;

    if (currentPlayer === mafiaIndex) {

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

    document.getElementById("message").innerText =
        "احفظ دورك جيدًا";

    // الانتقال تلقائيًا بعد 2.5 ثانية

    timer = setTimeout(function() {

        currentPlayer++;

        if (currentPlayer < playersCount) {

            revealed = false;

            showPlayer();

        } else {

            document.getElementById("playersContainer").innerHTML = "";

            document.getElementById("playerTitle").innerText =
                "انتهى توزيع الأدوار";

            document.getElementById("message").innerText =
                "🎉 تم توزيع جميع الأدوار";

        }

    }, 1000);

}


// إعادة اللعب

function restartGame() {

    createGame();

}
