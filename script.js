const searchBar = document.getElementById("searchBar");
const modes = document.querySelectorAll(".mode");


// SEARCH

searchBar.addEventListener("input", function() {

    const searchText = searchBar.value.toLowerCase().trim();

    modes.forEach(function(mode) {

        // Get only the mode's name
        const modeName = mode.querySelector(".mode-title span").textContent.toLowerCase();

        // The exact letters typed must appear in the same order
        if (modeName.includes(searchText)) {
            mode.style.display = "block";
        } else {
            mode.style.display = "none";
        }

    });

});


// CLICK MODE

modes.forEach(function(mode) {

    mode.addEventListener("click", function(event) {

        // Don't open/close the mode when clicking a verifier
        if (event.target.classList.contains("verifier")) {
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