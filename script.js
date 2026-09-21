alert("SCRIPT IS WORKING - DISCORD TEST");

console.log("========== CML SCRIPT STARTED ==========");

const searchBar = document.getElementById("searchBar");
const modes = document.querySelectorAll(".mode");

console.log("Search bar:", searchBar);
console.log("Modes found:", modes.length);


// =========================
// DISCORD LOGIN CHECK
// =========================

const DISCORD_WORKER =
    "https://cml-discord-login.majorbooz22.workers.dev";

console.log("Checking Discord login...");
console.log("Worker URL:", DISCORD_WORKER + "/me");

fetch(DISCORD_WORKER + "/me", {
    method: "GET",
    credentials: "include"
})
.then(function(response) {

    console.log("========== DISCORD RESPONSE ==========");
    console.log("Status:", response.status);
    console.log("OK:", response.ok);
    console.log("Headers:", [...response.headers.entries()]);

    return response.text();

})
.then(function(text) {

    console.log("Response text:", text);

    try {

        const data = JSON.parse(text);

        console.log("Parsed data:", data);
        console.log("loggedIn:", data.loggedIn);

        if (data.loggedIn === true) {

            console.log(">>> LOGIN DETECTED <<<");

            document.body.classList.add("logged-in");

        } else {

            console.log(">>> NOT LOGGED IN <<<");

            document.body.classList.remove("logged-in");

        }

    } catch (error) {

        console.error("Could not parse response:", error);

    }

})
.catch(function(error) {

    console.error("========== DISCORD FETCH ERROR ==========");
    console.error(error);

});


// =========================
// SEARCH
// =========================

searchBar.addEventListener("input", function() {

    const searchText =
        searchBar.value.toLowerCase().trim();

    modes.forEach(function(mode) {

        const modeName =
            mode.querySelector(".mode-title span")
            .textContent
            .toLowerCase();

        if (modeName.includes(searchText)) {

            mode.style.display = "block";

        } else {

            mode.style.display = "none";

        }

    });

});


// =========================
// CLICK MODE
// =========================

modes.forEach(function(mode) {

    mode.addEventListener("click", function(event) {

        if (event.target.classList.contains("verifier")) {
            return;
        }

        if (event.target.classList.contains("submit-button")) {
            return;
        }

        modes.forEach(function(otherMode) {

            if (otherMode !== mode) {
                otherMode.classList.remove("open");
            }

        });

        mode.classList.toggle("open");

    });

});
