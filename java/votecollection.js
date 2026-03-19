/* menu functions */
// toggles the dropdown menu visibility
function toggleMenu() {
    const menu = document.getElementById("menuDropdown");
    // if it's flex (showing), change to none (hide). otherwise, show it.
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// keeps track of who we clicked on
let selectedTeacher = null;

// this opens the voting popup for a specific subject
function openVote(subject){
  selectedSubject = subject;
  selectedTeacher = null;

  // show the darkened background/modal
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("subjectTitle").innerText = subject;

  const list = document.getElementById("teacherList");
  list.innerHTML = ""; // clear out the old list before adding new ones

  // find the teachers for this subject and make a button for each
  (teachers[subject] || []).forEach(name => {
    const div = document.createElement("div");

    div.className = "teacher-btn";
    div.innerText = name;

    // when you click a teacher, highlight them and save the name
    div.onclick = () => {
      document
        .querySelectorAll(".teacher-btn")
        .forEach(t => t.classList.remove("selected")); // un-highlight everyone else

      div.classList.add("selected");
      selectedTeacher = name;
    };

    list.appendChild(div);
  });
}

//  hides the modal
function closeModal(){
  document.getElementById("overlay").style.display="none";
}

// handles the actual voting logic
function confirmVote(){
  if(!selectedTeacher){
    alert("please select a teacher.");
    return;
  }

  // grab existing votes from localstorage or start fresh if it's empty
  let votes=JSON.parse(localStorage.getItem("categoryVotes"))||{};
  
  //category -> subject -> teacher
  votes[CATEGORY]=votes[CATEGORY]||{};
  votes[CATEGORY][selectedSubject]=votes[CATEGORY][selectedSubject]||{};
  
  // add 1 to theteacher's score
  votes[CATEGORY][selectedSubject][selectedTeacher]=(votes[CATEGORY][selectedSubject][selectedTeacher]||0)+1;

  // save the updated object back to localstorage as a string
  localStorage.setItem("categoryVotes",JSON.stringify(votes));

  alert(`vote saved for ${selectedTeacher}!`);
  closeModal();
}