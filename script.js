const searchBar = document.getElementById("searchBar");
const modes = document.querySelectorAll(".mode");


// =========================
// DISCORD LOGIN DEBUG
// =========================

const DISCORD_WORKER =
    "https://cml-discord-login.majorbooz22.workers.dev";

fetch(DISCORD_WORKER + "/me", {
    method: "GET",
    credentials: "include"
})
.then(function(response) {

    console.log("ME STATUS:", response.status);

    return response.text();

})
.then(function(text) {

    console.log("ME RESPONSE:", text);

    try {

        const data = JSON.parse(text);

        if (data.loggedIn === true) {

            console.log("LOGIN DETECTED!");
            document.body.classList.add("logged-in");

        } else {

            console.log("NOT LOGGED IN");
            document.body.classList.remove("logged-in");

        }

    } catch (error) {

        console.log("COULD NOT READ LOGIN RESPONSE");

    }

})
.catch(function(error) {

    console.log("DISCORD FETCH ERROR:", error);

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
