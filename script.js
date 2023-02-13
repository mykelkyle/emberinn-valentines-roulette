const input = [
  "Kuro",
  "Anna",
  "Lucy",
  "Klara",
  "Kat",
  "Yari",
  "David",
  "Wild",
  "Jojo",
  "Zi Shan",
  "Mykel",
  "Saigui",
  "Nicoll",
  "Nikolai",
  "Hans",
  "Mars",
  "Mae",
  "Sofia",
  "Fra",
  "Sid",
  "Selena",
  "BN",
  "Moka",
  "Taeko",
  "Dar",
  "Eden",
  "Kanako",
  "Jacob",
  "Salvi",
  "Siwar",
];
const startBtn = document.getElementById("start-button");
const nameContainer = document.querySelector(".name-container");
const memberContainer = document.querySelector(".member-container");
const btnContainer = document.querySelector(".button-container");
const middleContainer = document.querySelector(".middle-container");
let counter = 0;
let nameArr = [];
function renderChoices() {
  for (i = 0; i < 3; i++) {
    const choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("id", "choice-button");
    btnContainer.appendChild(choiceBtn);
    choiceBtn.textContent += getRandomNames(input, 3)[
      Math.floor(Math.random() * 3)
    ];
  }
}
function addName(name) {
  const nameBtn = document.createElement("button");
  nameBtn.setAttribute("class", "name-button");
  nameContainer.appendChild(nameBtn);
  nameBtn.textContent = name;
  nameArr.push(name);
}
function addMembers() {
  for (i = 0; i < input.length; i++) {
    if (nameArr.includes(input[i])) continue;
    const memberBtn = document.createElement("button");
    memberBtn.setAttribute("class", "member-button");
    memberContainer.appendChild(memberBtn);
    memberBtn.textContent = input[i];
  }
}
function clearChoices() {
  while (btnContainer.firstChild) {
    btnContainer.removeChild(btnContainer.firstChild);
  }
}
function restart() {
  location.reload();
}
function endScreen() {
  const endBtn = document.createElement("button");
  btnContainer.appendChild(endBtn);
  endBtn.setAttribute("id", "end-button");
  endBtn.textContent += "Reload";
}

function addTextBox(name) {
  const textAreaEl = document.createElement("TEXTAREA");
  textAreaEl.setAttribute("id", `${name}1`);
  textAreaEl.textContent += `Dear ${name},`;
  middleContainer.appendChild(textAreaEl);
}

//  Start button
startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  renderChoices();
});

// Add Member buttons

document.body.addEventListener("click", function (e) {
  if (e.target.className == "member-button") {
    if (nameContainer.childElementCount > 6) {
      alert("Error, maximum of 6 valentines.");
      return;
    }
    e.target.classList.add("hidden");
    addName(e.target.textContent);
  }
});

// Choice buttons

document.body.addEventListener("click", function (e) {
  if (e.target.id == "choice-button") {
    clearChoices();
    renderChoices();
    addName(e.target.textContent);
    counter += 1;
    if (counter == 3) {
      clearChoices();
      endScreen();
      addMembers();
    }
  }
});

// Restart button

document.body.addEventListener("click", function (e) {
  if (e.target.id == "end-button") {
    restart();
  }
});

// Text input buttons (Your Valentines)
// If no text box is linked with a particular name's ID, create one.
// Else, hide the text box

document.body.addEventListener("click", function (e) {
  if (e.target.className == "name-button") {
    if (document.getElementById(e.target.textContent + "1") == null) {
      addTextBox(e.target.textContent);
    } else {
      document
        .getElementById(e.target.textContent + "1")
        .classList.toggle("hidden");
    }
  }
});

// This method gets multiple random items from a list by using the Modern Fisher-Yates Shuffle method
// This method makes duplicates impossible by putting "taken" numbers in the "shuffled part" of the list and only getting a new number from the "unshuffled part".
function getRandomNames(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  while (n--) {
    // Get random number (x)
    var x = Math.floor(Math.random() * len);
    // Fill in the choice list from back to front (cuz `n--` in while loop)
    // Get the name belonging to the random number. If the random number appeared before, use the number linked to in the "taken list" to get a non-duplicate name.
    result[n] = arr[x in taken ? taken[x] : x];
    // Register the random number in the "taken list" and link it to index number that goes from (array length - 1) to 0.
    // When a random number has already appeared, it uses the previous index number for the result and overwrites the link with the new index number.
    // When the next index number already has a link (which will always be a higher number), it copies that link, since it's not possible to get a random number that high anymore.
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
function createChart() {
  const chartBody = document.getElementById("name-chart-data");
  for (item of input) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = item;
    const td = document.createElement("td");
    td.setAttribute("id", item);
    td.setAttribute("style", "--size: calc( 0/6 )");
    tr.appendChild(th);
    tr.appendChild(td);
    chartBody.appendChild(tr);
  }
}
function updateChart(name) {
  const column = document.getElementById(name).style.cssText;
  const amount = parseInt(column.match(/\d/));
  document.getElementById(name).style.cssText = column.replace(
    /\d/,
    amount + 1
  );
  if (amount == 3) {
    input.splice(input.indexOf(name), 1);
  }
}
createChart(input);
for (let i = 0; i < 90; i++) {
  const randomName = getRandomNames(input, 3)[Math.floor(Math.random() * 3)];
  updateChart(randomName);
}
