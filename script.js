const searchBar = document.getElementById("searchBar");
const modes = document.querySelectorAll(".mode");


// =========================
// DEBUG MESSAGE
// =========================

const debugBox = document.createElement("div");

debugBox.style.position = "fixed";
debugBox.style.bottom = "20px";
debugBox.style.left = "20px";
debugBox.style.background = "#222";
debugBox.style.color = "white";
debugBox.style.padding = "15px";
debugBox.style.borderRadius = "8px";
debugBox.style.zIndex = "99999";
debugBox.style.fontFamily = "Arial";
debugBox.style.fontSize = "14px";

debugBox.textContent = "Checking Discord login...";

document.body.appendChild(debugBox);


// =========================
// DISCORD LOGIN CHECK
// =========================

const DISCORD_WORKER =
    "https://cml-discord-login.majorbooz22.workers.dev";

fetch(DISCORD_WORKER + "/me", {
    method: "GET",
    credentials: "include"
})
.then(function(response) {

    debugBox.textContent =
        "Discord response: " + response.status;

    return response.text();

})
.then(function(text) {

    debugBox.textContent =
        "Discord response: " + text;

    try {

        const data = JSON.parse(text);

        if (data.loggedIn === true) {

            document.body.classList.add("logged-in");

            debugBox.textContent =
                "LOGIN DETECTED! Submit should be visible.";

        } else {

            document.body.classList.remove("logged-in");

            debugBox.textContent =
                "NOT LOGGED IN. Submit is hidden.";

        }

    } catch (error) {

        debugBox.textContent =
            "Could not read Discord response.";

    }

})
.catch(function(error) {

    debugBox.textContent =
        "DISCORD ERROR: " + error.message;

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
