function saveVote(category, teacherName, year){
  let votes = JSON.parse(localStorage.getItem("teacherVotes")) || {};

  if (!votes[category]) votes[category] = {};
  if (!votes[category][teacherName]) {
    votes[category][teacherName] = { fyp: 0, ayp: 0, syp: 0 };
  }

  votes[category][teacherName][year]++;

  localStorage.setItem("teacherVotes", JSON.stringify(votes));
}
