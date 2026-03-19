// handles the little dropdown menu at the top
function toggleMenu() {
    const menu = document.getElementById("menuDropdown");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

document.addEventListener('DOMContentLoaded', () => {
    // getting all the elements we need from the html
    const noteModal = document.getElementById("noteModal");
    const postModal = document.getElementById("postModal");
    const postGrid = document.getElementById("postGrid");
    const postForm = document.getElementById('freedomPostForm');
    const openNoteBtn = document.getElementById("openNoteBtn");
    const continueBtn = document.getElementById("continueBtn");
    const modalTitle = document.querySelector("#postModal .modal-title");
    
    const anonCheck = document.getElementById('anonCheck');
    const nameInput = document.getElementById('postFrom');

    // null if we're making a new post
    let editIndex = null; 
    // grab saved posts from local storage 
    let posts = JSON.parse(localStorage.getItem("freedomPosts")) || [];

    //post as anonymouscheckbox logic
    anonCheck.addEventListener('change', () => {
        if (anonCheck.checked) {
            nameInput.value = "";
            nameInput.disabled = true; 
            nameInput.placeholder = "locked (anonymous)";
            nameInput.style.opacity = "0.5";
            nameInput.style.cursor = "not-allowed";
        } else {
            nameInput.disabled = false; 
            nameInput.placeholder = "your name/batch";
            nameInput.style.opacity = "1";
            nameInput.style.cursor = "text";
        }
    });

    function renderPosts() {
        postGrid.innerHTML = "";
        posts.forEach((post, index) => {
            const card = document.createElement('div');
            card.className = 'post-card';
            // putting the post data into the card html
            card.innerHTML = `
                <button class="delete-post" onclick="deletePost(${index})">✕</button>
                <h3>${post.title}</h3>
                <p>${post.message}</p>
                <div class="post-footer">
                    <span class="from">— ${post.author}</span>
                    <button class="edit-post-btn" onclick="openEditModal(${index})">✎ edit note</button>
                </div>
            `;
            postGrid.appendChild(card);
        });
    }

    // click handler for starting a new post
    openNoteBtn.onclick = () => {
        editIndex = null;
        postForm.reset();
        // trigger the anon check 
        anonCheck.dispatchEvent(new Event('change'));
        modalTitle.innerText = "NEW POST";
        noteModal.style.display = "flex";
    };

    // function to fill the modal with old data so we can edit it
    window.openEditModal = (index) => {
        editIndex = index;
        const post = posts[index];
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postMessage').value = post.message;
        
        const isAnon = post.author === "Anonymous";
        anonCheck.checked = isAnon;
        nameInput.value = isAnon ? "" : post.author;
        
        anonCheck.dispatchEvent(new Event('change'));
        
        modalTitle.innerText = "EDIT POST";
        postModal.style.display = "flex";
    };

    continueBtn.onclick = () => {
        noteModal.style.display = "none";
        postModal.style.display = "flex";
    };

    // close buttons for the modals
    document.querySelectorAll("[data-close]").forEach(btn => {
        btn.onclick = () => {
            noteModal.style.display = "none";
            postModal.style.display = "none";
        };
    });

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('postTitle').value;
        const message = document.getElementById('postMessage').value;
        const isAnon = anonCheck.checked;
        const author = isAnon ? "Anonymous" : (nameInput.value || "Anonymous");

        const postData = { title, message, author };
        
        if (editIndex !== null) {
            // update existing post
            posts[editIndex] = postData;
        } else {
            // add new post to the front of the list
            posts.unshift(postData);
        }

        // save to browser memory
        localStorage.setItem("freedomPosts", JSON.stringify(posts));
        renderPosts();
        postForm.reset();
        postModal.style.display = "none";
    });

    window.deletePost = (index) => {
        if(confirm("are you sure you want to delete this post?")) {
            posts.splice(index, 1);
            localStorage.setItem("freedomPosts", JSON.stringify(posts));
            renderPosts();
        }
    };

    renderPosts();
});