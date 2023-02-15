const input = [
  "Brandon",
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
  "Moka",
  "Taeko",
  "Dar",
  "Eden",
  "Kanako",
  "Jacob",
  "Salvi",
  "Siwar",
];

// const pictures = [
//   "https://cdn.discordapp.com/avatars/174323796423999488/6938504c07f36ed20e64e1a47877ec5d.webp?size=160",
//   "https://cdn.discordapp.com/avatars/812478009164431400/e7ff13e548e63335f363374cc2a3355a.webp?size=160",
// ];

const startBtn = document.getElementById("start-button");
const nameContainer = document.querySelector(".name-container");
const memberContainer = document.querySelector(".member-container");
const btnContainer = document.querySelector(".button-container");
const middleContainer = document.querySelector(".middle-container");
const textboxContainer = document.getElementById("textbox-container");
const instructionsContainer = document.getElementById("instructions-container");
let counter = 0;
let nameArr = [];

// function createImage(container, randomName) {
//   const picture = document.createElement("img");
//   const arrIndex = input.indexOf(randomName);
//   picture.setAttribute("src", pictures[arrIndex]);
//   container.appendChild(picture);
// }

function renderChoices() {
  for (i = 0; i < 3; i++) {
    const choiceDiv = document.createElement("div");
    const choiceBtn = document.createElement("button");
    const randomName = getRandomNames(input, 3)[Math.floor(Math.random() * 3)];
    choiceDiv.setAttribute("class", "choice-div");
    choiceBtn.setAttribute("id", "choice-button");
    btnContainer.appendChild(choiceDiv);
    choiceDiv.appendChild(choiceBtn);
    choiceBtn.textContent += randomName;
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

function addTextBox(name) {
  const textAreaEl = document.createElement("textarea");
  textAreaEl.setAttribute("id", `${name}1`);
  textAreaEl.setAttribute("class", "textbox");
  textAreaEl.textContent += `Dear ${name},`;
  textboxContainer.appendChild(textAreaEl);
}

function countCharacters() {}
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
      addMembers();

      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Send Messages";
      btnContainer.appendChild(submitBtn);
    }
  }
});

// Text input buttons (Your Valentines)
// If no text box is linked with a particular name's ID, create one.
// Else, hide the text box

document.body.addEventListener("click", function (e) {
  if (e.target.className == "name-button") {
    if (document.getElementById(e.target.textContent + "1") == null) {
      addTextBox(e.target.textContent);
    }

    const textareas = middleContainer.querySelectorAll("textarea");
    for (const textarea of textareas) {
      textarea.classList.add("hidden");
    }

    document
      .getElementById(e.target.textContent + "1")
      .classList.remove("hidden");
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
