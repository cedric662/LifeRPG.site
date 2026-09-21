let player = {
    level: 1,
    xp: 0,

    energy: 70,
    mood: 60,
    study: 30,
    fitness: 40,
    social: 50,

    money: 100
};


// Get elements from HTML

const levelElement = document.getElementById("level");
const xpElement = document.getElementById("xp");

const energyElement = document.getElementById("energy");
const moodElement = document.getElementById("mood");
const studyElement = document.getElementById("study");
const fitnessElement = document.getElementById("fitness");
const socialElement = document.getElementById("social");
const moneyElement = document.getElementById("money");

const xpProgress = document.querySelector(".xp-progress");

const energyProgress =
    document.querySelector(".energy-progress");

const moodProgress =
    document.querySelector(".mood-progress");

const studyProgress =
    document.querySelector(".study-progress");

const fitnessProgress =
    document.querySelector(".fitness-progress");

const socialProgress =
    document.querySelector(".social-progress");


// Keep stats between 0 and 100

function clampStats() {

    player.energy = Math.max(0, Math.min(100, player.energy));

    player.mood = Math.max(0, Math.min(100, player.mood));

    player.study = Math.max(0, Math.min(100, player.study));

    player.fitness = Math.max(0, Math.min(100, player.fitness));

    player.social = Math.max(0, Math.min(100, player.social));
}


// Add XP

function addXP(amount) {

    player.xp += amount;

    checkLevelUp();
}


// Level up

function checkLevelUp() {

    const requiredXP = player.level * 100;

    if (player.xp >= requiredXP) {

        player.xp -= requiredXP;

        player.level++;

        alert("Level Up! You are now Level " + player.level);
    }
}


// Study

function study() {

    player.study += 10;

    player.energy -= 5;

    addXP(20);

    updateScreen();
}


// Exercise

function exercise() {

    player.fitness += 10;

    player.energy -= 10;

    player.mood += 5;

    addXP(25);

    updateScreen();
}


// Socialize

function socialize() {

    player.social += 10;

    player.mood += 5;

    addXP(15);

    updateScreen();
}


// Sleep

function sleep() {

    player.energy += 25;

    player.mood += 5;

    addXP(10);

    updateScreen();
}


// Rest

function rest() {

    player.energy += 10;

    player.mood += 2;

    addXP(5);

    updateScreen();
}


// Update everything on screen

function updateScreen() {

    clampStats();

    levelElement.textContent = player.level;

    xpElement.textContent = player.xp;

    energyElement.textContent = player.energy;

    moodElement.textContent = player.mood;

    studyElement.textContent = player.study;

    fitnessElement.textContent = player.fitness;

    socialElement.textContent = player.social;

    moneyElement.textContent = player.money;


    // Update progress bars

    energyProgress.style.width =
        player.energy + "%";

    moodProgress.style.width =
        player.mood + "%";

    studyProgress.style.width =
        player.study + "%";

    fitnessProgress.style.width =
        player.fitness + "%";

    socialProgress.style.width =
        player.social + "%";


    // XP progress

    const requiredXP = player.level * 100;

    const xpPercentage =
        (player.xp / requiredXP) * 100;

    xpProgress.style.width =
        xpPercentage + "%";


    saveGame();
}


// Save game

function saveGame() {

    localStorage.setItem(
        "lifeRPG",
        JSON.stringify(player)
    );
}


// Load game

function loadGame() {

    const savedGame =
        localStorage.getItem("lifeRPG");

    if (savedGame) {

        player = JSON.parse(savedGame);
    }
}


// Button events

document
    .getElementById("study-button")
    .addEventListener("click", study);

document
    .getElementById("exercise-button")
    .addEventListener("click", exercise);

document
    .getElementById("social-button")
    .addEventListener("click", socialize);

document
    .getElementById("sleep-button")
    .addEventListener("click", sleep);

document
    .getElementById("rest-button")
    .addEventListener("click", rest);


// Start game

loadGame();

updateScreen();