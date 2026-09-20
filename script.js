const searchBar = document.getElementById("searchBar");
const modes = document.querySelectorAll(".mode");

searchBar.addEventListener("input", function() {
    const searchText = searchBar.value.toLowerCase();

    modes.forEach(function(mode) {
        const modeName = mode.textContent.toLowerCase();

        if (modeName.includes(searchText)) {
            mode.style.display = "flex";
        } else {
            mode.style.display = "none";
        }
    });
});