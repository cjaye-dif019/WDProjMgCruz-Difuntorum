/* menu functions */
function toggleMenu() {
const menu = document.getElementById("menuDropdown");
menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

let selectedSubject=null;

function openVote(subject){
  selectedSubject=subject;
  selectedTeacher=null;

  document.getElementById("overlay").style.display="flex";
  document.getElementById("subjectTitle").innerText=subject;

  const list=document.getElementById("teacherList");
  list.innerHTML="";

  (teachers[subject]||[]).forEach(name=>{
    const div=document.createElement("div");
    div.className="teacher";
    div.innerText=name;
    div.onclick=()=>{
      document.querySelectorAll(".teacher").forEach(t=>t.classList.remove("selected"));
      div.classList.add("selected");
      selectedTeacher=name;
    };
    list.appendChild(div);
  });
}

function closeModal(){
  document.getElementById("overlay").style.display="none";
}

function confirmVote(){
  if(!selectedTeacher){
    alert("Please select a teacher.");
    return;
  }

  let votes=JSON.parse(localStorage.getItem("categoryVotes"))||{};
  votes[CATEGORY]=votes[CATEGORY]||{};
  votes[CATEGORY][selectedSubject]=votes[CATEGORY][selectedSubject]||{};
  votes[CATEGORY][selectedSubject][selectedTeacher]=(votes[CATEGORY][selectedSubject][selectedTeacher]||0)+1;

  localStorage.setItem("categoryVotes",JSON.stringify(votes));

  alert(`Vote saved for ${selectedTeacher}!`);
  closeModal();
}