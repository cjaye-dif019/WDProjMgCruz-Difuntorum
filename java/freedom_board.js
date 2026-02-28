//menu settings
function toggleMenu() {
    const menu = document.getElementById("menuDropdown");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

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
function toggleMenu() {
    const menu = document.getElementById("menuDropdown");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    const noteModal = document.getElementById("noteModal");
    const postModal = document.getElementById("postModal");
    const postGrid = document.getElementById("postGrid");
    const postForm = document.getElementById('freedomPostForm');
    const openNoteBtn = document.getElementById("openNoteBtn");
    const continueBtn = document.getElementById("continueBtn");

//modal buttons
    openNoteBtn.onclick = () => {
        noteModal.style.display = "flex";
    };

    continueBtn.onclick = () => {
        noteModal.style.display = "none";
        postModal.style.display = "flex";
    };

    document.querySelectorAll("[data-close]").forEach(btn => {
        btn.onclick = () => {
            noteModal.style.display = "none";
            postModal.style.display = "none";
        };
    });

//form settings
    postForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        // getting the values
        const title = document.getElementById('postTitle').value;
        const message = document.getElementById('postMessage').value;
        const isAnon = document.getElementById('anonCheck').checked;
        const nameInput = document.getElementById('postFrom').value;
        
        // author name
        const author = isAnon ? "Anonymous" : (nameInput || "Anonymous");

        // new post code
        const newPost = document.createElement('div');
        newPost.className = 'post-card';
        newPost.innerHTML = `
            <h3>${title}</h3>
            <p>${message}</p>
            <span class="from">— ${author}</span>
        `;


        postGrid.prepend(newPost);

        //reset
        postForm.reset();
        postModal.style.display = "none"; 
    });
});