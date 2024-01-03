


var Name = prompt("Adınız nedir?"); 


const quizElement = document.getElementById("question");
const quest_count = document.getElementById("quest_count");
const answer_btn = document.getElementById("answers");
const next_btn = document.getElementById("next_btn");
const prev_btn = document.getElementById("prev_btn");


next_btn.style.display = "none";

let currentQuestIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestIndex = 0;
    score = 0;
    showQuest();
}

function showQuest() {
    let currentQ = questions[currentQuestIndex];
    quizElement.innerHTML = currentQ.question;
    quest_count.innerHTML = currentQuestIndex+1 + " / " + questions.length;

    // Temizleme işlemi
    answer_btn.innerHTML = "";

    currentQ.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn_ans");
        button.addEventListener("click", () => selectAnswer(index));
        answer_btn.appendChild(button);

        if(currentQuestIndex == 0)
            prev_btn.style.opacity = 0;
        else
        prev_btn.style.opacity = 1;

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

    });

    // Sorunun sonunda next butonunu güncelle
    if (currentQuestIndex === questions.length - 1) {
        next_btn.innerHTML = "Quiz'i Bitir";
    } else {
        next_btn.innerHTML = "Sonraki Soru";
    }
}

function selectAnswer(index) {
    const selectedBtn = answer_btn.children[index];
    const isCorrect = selectedBtn.dataset.correct === "true";


    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else 
        selectedBtn.classList.add("incorrect");

    Array.from(answer_btn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    next_btn.style.display = "block";
}

function showNextQuestion() {
    if (currentQuestIndex < questions.length - 1) {
        currentQuestIndex++;
        showQuest();
    } else {
        // Quiz bittiğinde yapılacak işlemler
        alert(Name + " öğrencisinin puanı: " + score);

        if(score == questions.length)
            alert("Tebrikler! Bütün soruları doğru cevapladın " + Name);
        else if(score >= 1)
            alert("Temel özelliklere biraz daha çalışman gerek!");
        else if(score == 0)
            alert("Hll moruq, bütün soruların yanlış cevaplarını buldun :D");

    }
}

function showPrevQuestion() {
    if (currentQuestIndex > 0) {
        currentQuestIndex--;
        showQuest();
    }
}
startQuiz();
