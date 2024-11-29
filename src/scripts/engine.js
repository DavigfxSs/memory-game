const themes = {
    space: {
        emojis: ["🌌", "🌌", "🌠", "🌠", "🚀", "🚀", "🛸", "🛸", "👽", "👽", "🌍", "🌍", "☄️", "☄️", "🪐", "🪐"],
        background: "linear-gradient(325deg, #000428, #004e92)", // Cor do body
        containerBackground: "linear-gradient(325deg, #0f0c29, #302b63, #24243e)", 
        cardBack: "#001f3f",
    },
    nature: {
        emojis: ["🌲", "🌲", "🌿", "🌿", "🍄", "🍄", "🍁", "🍁", "🌻", "🌻", "🐝", "🐝", "🦋", "🦋", "🍂", "🍂"],
        background: "linear-gradient(325deg, #56ab2f, #a8e063)",
        containerBackground: "linear-gradient(325deg, #2b580c, #639a67, #a1d884)",
        cardBack: "#2d6a4f",
    },
    future: {
        emojis: ["🤖", "🤖", "⚙️", "⚙️", "🛰️", "🛰️", "🔋", "🔋", "💾", "💾", "🌐", "🌐", "🕹️", "🕹️", "📡", "📡"],
        background: "linear-gradient(325deg, #0f2027, #2c5364)",
        containerBackground: "linear-gradient(325deg, #091236, #1e215d, #41436a)",
        cardBack: "#34495e",
    },
};

let openCards = [];
let shuffleEmojis = [];

function applyTheme(theme) {
    const selectedTheme = themes[theme];

    
    shuffleEmojis = selectedTheme.emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

    
    document.body.style.background = selectedTheme.background;
    document.querySelector(".container").style.background = selectedTheme.containerBackground;
    document.documentElement.style.setProperty("--card-back", selectedTheme.cardBack);

    
    document.querySelector(".game").innerHTML = "";
    openCards = [];
    startGame();
}

function startGame() {
    for (let i = 0; i < shuffleEmojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = shuffleEmojis[i];
        box.onclick = handleClick;
        document.querySelector(".game").appendChild(box);
    }
}

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        
        
        animateCards(openCards[0]);
        animateCards(openCards[1]);
        
        
        
        
        
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === shuffleEmojis.length) {
        alert("Você memorizou todas as cartas. Parabéns!");
    }
}


function animateCards(card) {
    card.classList.add("cardAnimation"); 
    
    setTimeout(() => {
        card.classList.remove("cardAnimation"); 
    }, 1000); 
}


const hour = new Date().getHours();
if (hour < 12) {
    applyTheme("nature");
} else if (hour < 18) {
    applyTheme("space");
} else {
    applyTheme("future");
}
