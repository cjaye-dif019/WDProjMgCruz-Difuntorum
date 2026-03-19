/* menu functions */
function toggleMenu() {
  const menu = document.getElementById("menuDropdown");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// reload data from localStorage
let data = JSON.parse(localStorage.getItem("categoryVotes")) || {};

/* overall top - showing top 5 */
function renderOverall() {
  const overallDiv = document.getElementById("bestOverall");
  overallDiv.innerHTML = "";
  
  const totals = {};
  //loops through everything for the winner
  Object.keys(data).forEach(cat => {
    Object.values(data[cat]).forEach(subject => {
      Object.entries(subject).forEach(([teacher, count]) => {
        totals[teacher] = (totals[teacher] || 0) + count;
      });
    });
  });

  const overall = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (overall.length > 0) {
    overall.forEach((t, i) => {
      overallDiv.innerHTML += `
        <div class="rank">
          ${i + 1}. ${t[0]} — <small>${t[1]} Total Votes</small>
        </div>
      `;
    });
  }
}

/* per category render with X button */
function renderCategory(categoryName, containerId) {
  const container = document.getElementById(containerId);
  const section = container.closest(".section");
  container.innerHTML = ""; 
  if (!data[categoryName]) {
    if (section) section.style.display = "none";
    return;
  }

  const years = ["FYP", "AYP", "SYP", "FYP & SYP", "FYP & AYP", "AYP & SYP"];
  let hasAnyVotes = false;

  years.forEach(year => {
    let yearVotes = {};

    Object.entries(data[categoryName]).forEach(([subject, teachers]) => {
      Object.entries(teachers).forEach(([teacher, votes]) => {
        if (typeof teacherYear !== 'undefined' && teacherYear[teacher] === year) {
          if (!yearVotes[teacher]) {
            yearVotes[teacher] = {
              votes: 0,
              subject: subject.replace(/_/g, " "),
              rawSubject: subject //stores the objects
            };
          }
          yearVotes[teacher].votes += votes;
        }
      });
    });

    const sorted = Object.entries(yearVotes)
      .sort((a, b) => b[1].votes - a[1].votes)
      .slice(0, 5);

    if (sorted.length === 0) return;
    hasAnyVotes = true;

    container.innerHTML += `<div class="subject-title">${year} TEACHERS</div>`;

    sorted.forEach((t, i) => {
      const teacherName = t[0];
      const voteInfo = t[1];

      const itemDiv = document.createElement("div");
      itemDiv.className = "rank-container";
      itemDiv.style.display = "flex";
      itemDiv.style.alignItems = "center";
      itemDiv.style.gap = "10px";
      itemDiv.style.marginBottom = "10px";

      itemDiv.innerHTML = `
        <div class="rank" style="flex: 1; margin-bottom: 0;">
          ${i + 1}. ${teacherName} (${voteInfo.subject}) — ${voteInfo.votes} Votes
        </div>
        <button class="delete-btn" onclick="removeVote('${categoryName}', '${voteInfo.rawSubject}', '${teacherName}')">×</button>
      `;
      container.appendChild(itemDiv);
    });
  });

  if (!hasAnyVotes) {
    if (section) section.style.display = "none";
  } else {
    if (section) section.style.display = "block";
  }
}

/* delete function */
function removeVote(category, subject, teacher) {
  if (confirm(`Remove all votes for ${teacher} in ${category}?`)) {
    // updates the object in the memory
    if (data[category] && data[category][subject]) {
      delete data[category][subject][teacher];
      
      // removes from the memory
      if (Object.keys(data[category][subject]).length === 0) delete data[category][subject];
      if (Object.keys(data[category]).length === 0) delete data[category];
    }

    // update the local storage
    localStorage.setItem("categoryVotes", JSON.stringify(data));

    initLeaderboard();
  }
}

function initLeaderboard() {
  renderOverall();
  renderCategory("TITO OF PISAY", "tito");
  renderCategory("TITA OF PISAY", "tita");
  renderCategory("BEST ENERGY IN CLASS", "energyinclass");
  renderCategory("BEST HANDWRITING", "handwriting");
  renderCategory("BEST LECTURER", "lecturer");
  renderCategory("BEST STORYTELLER", "storyteller");
  renderCategory("BEST TEST DESIGNER", "testdesigner");
  renderCategory("MOST APPROACHABLE", "approachable"); 
  renderCategory("MOST FASHIONABLE", "fashionable");
  renderCategory("MOST INSPIRING", "inspiring");
  renderCategory("MOST ORGANIZED", "organized");
  renderCategory("MOST PASSIONATE ABOUT TEACHING", "passionateaboutteaching");
  renderCategory("MOST PATIENT", "patient");
  renderCategory("MOST RELATABLE", "relatable");
}

initLeaderboard();