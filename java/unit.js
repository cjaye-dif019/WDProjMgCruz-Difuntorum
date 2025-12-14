/* menu funcitons */
function toggleMenu() {
    const menu = document.getElementById("menuDropdown");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

/* popup function */
document.querySelectorAll(".teacher-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById("popupName").innerText = btn.dataset.name;
        document.getElementById("popupDetails").innerText = btn.dataset.details;
        document.getElementById("popupImg").src = btn.dataset.img;
        document.getElementById("popupBg").style.display = "flex";
    });
});

function closePopup() {
    document.getElementById("popupBg").style.display = "none";
}