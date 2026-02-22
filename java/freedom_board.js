const noteModal = document.getElementById("noteModal");
const postModal = document.getElementById("postModal");
const postGrid = document.querySelector(".post-grid");

// buttons
document.getElementById("openNoteBtn").onclick = () => {
    noteModal.style.display = "flex";
};

document.getElementById("continueBtn").onclick = () => {
    noteModal.style.display = "none";
    postModal.style.display = "flex";
};

document.querySelectorAll("[data-close]").forEach(btn => {
    btn.onclick = () => {
        noteModal.style.display = "none";
        postModal.style.display = "none";
    };
});

const anonCheck = document.getElementById("anonCheck");
const fromInput = document.getElementById("postFrom");

anonCheck.onchange = () => {
    if (anonCheck.checked) {
        fromInput.placeholder = "Anonymous (optional)";
        fromInput.required = false;
    } else {
        fromInput.placeholder = "Your name";
        fromInput.required = true;
    }
};

document.getElementById("submitPost").onclick = () => {
    const title = document.getElementById("postTitle").value.trim();
    const message = document.getElementById("postMessage").value.trim();
    let from = fromInput.value.trim();

    if (!title || !message) {
        alert("Please fill in the title and message.");
        return;
    }

    if (anonCheck.checked) {
        from = from || "Anonymous";
    } else {
        if (!from) {
            alert("Please enter your name or choose anonymous.");
            return;
        }
    }

    const postCard = document.createElement("div");
    postCard.className = "post-card";

    postCard.innerHTML = `
        <h3>${title}</h3>
        <p>${message}</p>
        <span class="from">— ${from}</span>
    `;

    postGrid.prepend(postCard);

    document.getElementById("postTitle").value = "";
    document.getElementById("postMessage").value = "";
    fromInput.value = "";
    anonCheck.checked = false;
    anonCheck.onchange();

    postModal.style.display = "none";
};