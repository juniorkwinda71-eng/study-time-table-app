/* =========================
   ANGEL SMART DIARY (UPGRADED)
   FULL FUNCTIONAL VERSION
========================= */

/* -------------------------
   ELEMENTS
------------------------- */

const dateEl = document.getElementById("date");
const textarea = document.querySelector("textarea");
const saveBtn = document.querySelector(".entry-box button");
const cards = document.querySelectorAll(".card");

/* -------------------------
   DATE DISPLAY
------------------------- */

function updateDate() {
    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    dateEl.textContent = now.toLocaleDateString("en-US", options);
}

updateDate();

/* -------------------------
   LOAD DRAFT
------------------------- */

textarea.value = localStorage.getItem("angel_draft") || "";

/* -------------------------
   SAVE ENTRY
------------------------- */

saveBtn.addEventListener("click", () => {

    const text = textarea.value.trim();

    if (!text) return;

    let entries = JSON.parse(localStorage.getItem("angel_entries")) || [];

    const entry = {
        id: Date.now(),
        text,
        date: new Date().toISOString(),
        favorite: false
    };

    entries.unshift(entry);

    localStorage.setItem("angel_entries", JSON.stringify(entries));

    localStorage.removeItem("angel_draft");

    textarea.value = "";

    alert("Saved ❤️");
});

/* -------------------------
   AUTO SAVE DRAFT
------------------------- */

textarea.addEventListener("input", () => {
    localStorage.setItem("angel_draft", textarea.value);
});

/* -------------------------
   CARD NAVIGATION
------------------------- */

cards.forEach(card => {

    card.addEventListener("click", () => {

        const title = card.querySelector("h3").innerText;

        if (title === "New Entry") {
            textarea.focus();
        }

        if (title === "Favorites") {
            openFavorites();
        }

        if (title === "Calendar") {
            openCalendar();
        }

        if (title === "Mood Tracker") {
            openMood();
        }

    });

});

/* -------------------------
   FAVORITES SYSTEM (REAL UI ALERT VIEW)
------------------------- */

function openFavorites() {

    const entries = JSON.parse(localStorage.getItem("angel_entries")) || [];

    const favs = entries.filter(e => e.favorite);

    if (favs.length === 0) {
        alert("No favorites yet ❤️");
        return;
    }

    let text = "❤️ FAVORITE ENTRIES\n\n";

    favs.forEach(e => {
        text += `${new Date(e.date).toDateString()}\n${e.text}\n\n`;
    });

    alert(text);
}

/* -------------------------
   TOGGLE FAVORITE (FOR FUTURE UI USE)
------------------------- */

function toggleFavorite(id) {

    let entries = JSON.parse(localStorage.getItem("angel_entries")) || [];

    entries = entries.map(e => {
        if (e.id === id) {
            e.favorite = !e.favorite;
        }
        return e;
    });

    localStorage.setItem("angel_entries", JSON.stringify(entries));
}

/* -------------------------
   CALENDAR SYSTEM (SIMPLE REAL VIEW)
------------------------- */

function openCalendar() {

    const entries = JSON.parse(localStorage.getItem("angel_entries")) || [];

    if (entries.length === 0) {
        alert("No entries yet ❤️");
        return;
    }

    let output = "📅 ANGEL DIARY CALENDAR\n\n";

    entries.forEach((e, i) => {
        output += `${i + 1}. ${new Date(e.date).toDateString()}\n`;
    });

    alert(output);
}

/* -------------------------
   MOOD SYSTEM (HISTORY SAVE)
------------------------- */

function openMood() {

    const mood = prompt("How are you feeling today?\n😊 😍 😔 😢 😡 😴");

    if (!mood) return;

    let moods = JSON.parse(localStorage.getItem("angel_moods")) || [];

    moods.unshift({
        mood,
        date: new Date().toISOString()
    });

    localStorage.setItem("angel_moods", JSON.stringify(moods));

    alert("Mood saved ❤️");
}

/* -------------------------
   OPTIONAL: LOAD MOOD
------------------------- */

const savedMood = JSON.parse(localStorage.getItem("angel_moods")) || [];

if (savedMood.length > 0) {
    console.log("Latest mood:", savedMood[0]);
}