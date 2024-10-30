// 翻訳データ
const translations = {
    en: {
        title: "Rock, Paper, Scissors game",
        choiceText: " Take your choice ",
        chooseLanguage: "Choose Language:",
        yourChoice: "Your Choice:",
        computerChoice: "Computer Choice:",
        victory: "Your victory",
        defeat: "Computer victory",
        draw: "DRAW",
        choices: {
            Rock: "Rock",
            Scissors: "Scissors",
            Paper: "Paper",
        }
    },
    ja: {
        title: "じゃんけんゲーム",
        choiceText: " あなたの選択 ",
        chooseLanguage: "言語を選択:",
        yourChoice: "あなたの選択:",
        computerChoice: "コンピュータの選択:",
        victory: "あなたの勝利",
        defeat: "コンピュータの勝利",
        draw: "引き分け",
        choices: {
            Rock: "グー",
            Scissors: "チョキ",
            Paper: "パー"
        }
    },
    zh: {
        title: "剪刀石头布游戏",
        choiceText: " 请选择 ",
        chooseLanguage: "选择语言:",
        yourChoice: "你的选择:",
        computerChoice: "电脑的选择:",
        victory: "你赢了",
        defeat: "电脑赢了",
        draw: "平局",
        choices: {
            Rock: "石头",
            Scissors: "剪刀",
            Paper: "布"
        }
    },
    ko: {
        title: "가위바위보 게임",
        choiceText: " 선택하세요 ",
        chooseLanguage: "언어 선택:",
        yourChoice: "당신의 선택:",
        computerChoice: "컴퓨터의 선택:",
        victory: "당신의 승리",
        defeat: "컴퓨터의 승리",
        draw: "무승부",
        choices: {
            Rock: "바위",
            Scissors: "가위",
            Paper: "보"
        }
    }
};

// 言語を変更する関数
function changeLanguage() {
    const language = document.getElementById("language-select").value;
    const text = translations[language];

    // テキスト要素を更新
    document.getElementById("title").textContent = text.title;
    document.getElementById("choice-text").textContent = text.choiceText;
    document.getElementById("choose-language").textContent = text.chooseLanguage;
    document.getElementById("your-choice").textContent = text.yourChoice;
    document.getElementById("computer-choice").textContent = text.computerChoice;
    document.getElementById("resultText").textContent = "";  // 前の結果をリセット
}

// ゲームのロジック
function playGame(playerChoice) {
    const choices = ["Rock", "Scissors", "Paper"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result;
    if (playerChoice === computerChoice) {
        result = "draw";
    } else if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Scissors" && computerChoice === "Paper") ||
        (playerChoice === "Paper" && computerChoice === "Rock")
    ) {
        result = "victory";
    } else {
        result = "defeat";
    }

    displayResult(playerChoice, computerChoice, result);
}

// ゲーム結果を翻訳して表示する関数
function displayResult(playerChoice, computerChoice, result) {
    const language = document.getElementById("language-select").value;
    const text = translations[language];

    document.getElementById("playerChoice").textContent = text.choices[playerChoice];
    document.getElementById("computerChoice").textContent = text.choices[computerChoice];

    const resultTextElement = document.getElementById("resultText");
    resultTextElement.className = "";  // 前のクラスをリセット

    // 結果テキストを言語に合わせて表示
    if (result === "victory") {
        document.getElementById("resultText").textContent = text.victory;
        resultTextElement.classList.add("win");
        launchConfetti();
    } else if (result === "defeat") {
        document.getElementById("resultText").textContent = text.defeat;
        resultTextElement.classList.add("lose");
    } else {
        document.getElementById("resultText").textContent = text.draw;
        resultTextElement.classList.add("draw");
    }

    // 結果を一時的に表示
    document.getElementById("result").classList.add("show");
    setTimeout(() => {
        document.getElementById("result").classList.remove("show");
    }, 3000);
}

// 紙吹雪を生成する関数
function launchConfetti() {
    const confettiContainer = document.getElementById("confetti-container");

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        // ランダムな位置と色を設定
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confettiContainer.appendChild(confetti);

        // 紙吹雪が落ちたら削除
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}