const quizData = [
    {
        question: "Apa kepanjangan dari HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlink Text Mode Language" 
        ],
        correct: 0
    },

    {
        question: "CSS digunakan untuk?",
        options: [
            "Struktur Halaman",
            "Styling Halaman",
            "Logika Program",
            "Menyimpan Database"
        ],
        correct: 1
    },

    {
        question: "Apa fungsi DOM dalam JavaScript?",
        options: [
            "Menghubungkan JavaScript Dengan Struktur HTML",
            "Membuat Database",
            "Mengatur Koneksi Internet",
            "Mengganti Sistem Operasi"
        ],
        correct: 2
    },

    {
        question: "Method Yang Digunakan Untuk Memilih Elemen Berdasarkan ID Adalah?",
        options: [
            "queryClass()",
            "getElementById()",
            "selectId()",
            "findElement()"
        ],
        correct: 1
    },

    {
        question: "Javascript digunakan untuk?",
        options: [
            "Membuat Database",
            "Mengatur Warna Saja",
            "Membuat Halaman Menjadi Interaktif",
            "Menghapus HTML"
        ],
        correct: 2  
    }

];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionEl =
document.querySelector("#question");
const resultEl =
document.querySelector("#result");
const scoreEl =
document.querySelector("#score");
const highScoreEl =
document.querySelector("#highScore");
const restartBtn =
document.querySelector("#restartBtn");
const optionsEl = 
document.querySelector("#options");
const nextBtn =
document.querySelector("#nextBtn");
const progressEl =
document.querySelector("#progress");
const timerEl = 
document.querySelector("#timer");

function startTimer() {
    clearInterval(timer);

    timeLeft = 30;
    timerEl.textContent = `Waktu: ${timeLeft} detik`;

    timer = setInterval(function() {
        timeLeft--;

        timerEl.textContent = `Waktu : $ {timeLeft} detik`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextBtn.click();
        }
    }, 1000)


}

function renderQuestion() {
    const q = quizData[currentQuestion];

    progressEl.textContent = `soal 
    ${currentQuestion + 1}/${quizData.length}`;

    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((option, index) => { const btn = document.createElement("button");
    
        btn.textContent = option;
        btn.classList.add("option-btn");
        btn.dataset.index = index;
        optionsEl.append(btn);
    });

    nextBtn.classList.add("hidden");

}

optionsEl.addEventListener("click",function(e){
    const btn = e.target.closest(".option-btn");

    if (!btn) return;

    const selectedIndex = Number(btn.dataset.index);
    const correctIndex = quizData[currentQuestion].correct;

    if (selectedIndex === correctIndex) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
    }

    const allButtons = optionsEl.querySelectorAll(".option-btn");
    allButtons.forEach(function(button){
        button.disabled = true;
    });

    nextBtn.classList.remove("hidden");

    startTimer()
});

nextBtn.addEventListener("click", function(){
    currentQuestion++;
    if (currentQuestion < quizData.length)
    {
        renderQuestion();
    } else {
        document.querySelector(".quiz-content").classList.add("hidden");
        resultEl.classList.remove("hidden");

        scoreEl.textContent = score;
        const savedHighScore = Number(localStorage.getItem("quizHighScore")) || 0;

        if (score > savedHighScore) {
            localStorage.setItem("quizHighScore", score);
        }

        highScoreEl.textContent = Math.max(score, savedHighScore);
    }
});

renderQuestion();
console.log("app.js berhasil dijalankan");

restartBtn.addEventListener("click",function()
    {
        currentQuestion = 0;
        score = 0;

        resultEl.classList.add("hidden");
    document.querySelector(".quiz-content").classList.remove("hidden");
        renderQuestion();
}); 