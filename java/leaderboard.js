function toggleMenu() {
  const menu = document.getElementById("menuDropdown");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

const data = JSON.parse(localStorage.getItem("categoryVotes")) || {};
const CATEGORY = "TITO OF PISAY";

/* overall top*/
function getOverallWinners(limit = 5){
  const totals = {};

  if(!data[CATEGORY]) return [];

  Object.values(data[CATEGORY]).forEach(subject=>{
    Object.entries(subject).forEach(([teacher, count])=>{
      totals[teacher] = (totals[teacher] || 0) + count;
    });
  });

  return Object.entries(totals)
  .sort((a,b)=>b[1]-a[1])
  .slice(0,limit);
}

const overallDiv = document.getElementById("bestOverall");
const overall = getOverallWinners();

if(overall.length > 0){
  overall.forEach((t,i)=>{
    overallDiv.innerHTML += `
      <div class="rank">
        ${i+1}. ${t[0]}
      </div>
    `;
  });
}

/* per category */
function renderCategory(categoryName, containerId){
  const container = document.getElementById(containerId);
  const section = container.closest(".section"); 

  if(!data[categoryName]){
    section.style.display = "none";
    return;
  }

  const years = ["FYP","AYP","SYP","FYP & SYP","FYP & AYP","AYP & SYP"];
  let hasAnyVotes = false;

  years.forEach(year => {
    let yearVotes = {};

    Object.entries(data[categoryName]).forEach(([subject, teachers])=>{
      Object.entries(teachers).forEach(([teacher, votes])=>{
        if(teacherYear[teacher] === year){
          if(!yearVotes[teacher]){
            yearVotes[teacher] = {
              votes: 0,
              subject: subject.replace(/_/g," ")
            };
          }
          yearVotes[teacher].votes += votes;
        }
      });
    });

    const sorted = Object.entries(yearVotes)
      .sort((a,b)=>b[1].votes - a[1].votes)
      .slice(0,5);

    if(sorted.length === 0) return;

    hasAnyVotes = true;

    container.innerHTML += `
      <div class="subject-title">${year} TEACHERS</div>
    `;

    sorted.forEach((t,i)=>{
      container.innerHTML += `
        <div class="rank">
          ${i+1}. ${t[0]} (${t[1].subject})
        </div>
      `;
    });
  });

  if(!hasAnyVotes){
    section.style.display = "none";
  }
}

renderCategory("TITO OF PISAY", "tito");
renderCategory("TITA OF PISAY", "tita");
renderCategory("BEST ENERGY IN CLASS", "energyinclass");
renderCategory("BEST HANDWRITING", "handwriting");
renderCategory("BEST LECTURER", "lecturer");
renderCategory("BEST STORYTELLER", "storyteller");
renderCategory("BEST TEST DESIGNER", "testdesigner");
renderCategory("MOST APPROCHABLE", "approachable");
renderCategory("MOST FASHIONABLE", "fashionable");
renderCategory("MOST INSPIRING", "inspiring");
renderCategory("MOST ORGANIZED", "organized");
renderCategory("MOST PASSIONATE ABOUT TEACHING", "passionateaboutteaching");
renderCategory("MOST PATIENT", "patient");
renderCategory("MOST RELATABLE", "relatable");