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

const pictures = [
  "https://cdn.discordapp.com/avatars/250957620930805761/ff6bc719ccc1366340495e4ecb958cda.webp?size=160",
];

const startBtn = document.getElementById("start-button");
const nameContainer = document.querySelector(".name-container");
const memberContainer = document.querySelector(".member-container");
const btnContainer = document.querySelector(".button-container");
const middleContainer = document.querySelector(".middle-container");
const textboxContainer = document.getElementById("textbox-container");
const instructionsContainer = document.getElementById("instructions-container");
let counter = 0;
let nameArr = [];

function renderImage(container) {
  const picture = document.createElement("img");
  picture.setAttribute("src", pictures[0]);
  container.appendChild(picture);
}

function renderChoices() {
  for (i = 0; i < 3; i++) {
    const choiceDiv = document.createElement("div");
    const choiceBtn = document.createElement("button");
    const randomName = getRandomNames(input, 3)[Math.floor(Math.random() * 3)];
    choiceDiv.setAttribute("class", "choice-div");
    choiceBtn.setAttribute("id", "choice-button");
    btnContainer.appendChild(choiceDiv);
    renderImage(choiceDiv);
    choiceDiv.appendChild(choiceBtn);
    choiceBtn.textContent += randomName;
  }
}
function addName(name) {
  const nameBtn = document.createElement("button");
  nameBtn.setAttribute("class", "name-button");
  nameBtn.setAttribute("id", `${name}` + 3);
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
  textAreaEl.setAttribute("minlength", "250");
  textAreaEl.textContent += `Dear ${name},`;
  textboxContainer.appendChild(textAreaEl);
  addCharCounter(name);
}

function addCharCounter(name) {
  const charCounter = document.createElement("span");
  charCounter.setAttribute("id", `${name}2`);
  charCounter.setAttribute("class", "char-counter");
  charCounter.textContent = `Min: 250 / ${name.length + 6}`;
  middleContainer.appendChild(charCounter);
}

function promptAreYouSure() {
  const response = confirm(
    "Are you sure? \n \n This will submit your messages. Press 'OK' only if you are completely finished. Press 'CANCEL' if you'd like to go back."
  );

  if (response) {
    console.log("Ok was pressed");
  } else {
    console.log("Cancel was pressed");
  }
}

function checkIfComplete() {
  const nameButtons = nameContainer.querySelectorAll("button");
  const nameButtonsArr = Array.from(nameButtons);
  const submitBtn = document.getElementById("submit-button");
  if (
    nameButtonsArr.every((nameButton) =>
      nameButton.className.includes("pink")
    ) == true
  ) {
    submitBtn.classList.remove("incomplete");
    submitBtn.setAttribute("onclick", "promptAreYouSure()");
  } else {
    submitBtn.removeAttribute("onclick");
    submitBtn.classList.add("incomplete");
  }
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
    checkIfComplete();
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
      addTextBox(nameArr[0]);

      const submitBtn = document.createElement("button");
      submitBtn.setAttribute("id", "submit-button");
      submitBtn.setAttribute("class", "incomplete");
      submitBtn.textContent = "Send Messages";
      btnContainer.appendChild(submitBtn);
    }
  }
});

// Text input buttons (Your Valentines)
// If no text box is linked with a particular name's ID, create one.
// Then, hide all textareas and display only selected textarea

document.body.addEventListener("click", function (e) {
  if (e.target.className == "name-button") {
    if (nameArr.length < 3) return;

    if (document.getElementById(e.target.textContent + "1") == null) {
      addTextBox(e.target.textContent);
    }

    const textareas = middleContainer.querySelectorAll("textarea");
    const characterCounters = middleContainer.querySelectorAll("span");
    for (const textarea of textareas) {
      textarea.classList.add("hidden");
    }
    for (const characterCounter of characterCounters) {
      characterCounter.classList.add("hidden");
    }
    document
      .getElementById(e.target.textContent + "1")
      .classList.remove("hidden");
    document
      .getElementById(e.target.textContent + "2")
      .classList.remove("hidden");
  }
});

// Checks for character count
document.body.addEventListener("input", function (e) {
  if (e.target.className == "textbox") {
    const characterCount = e.target.value.length;
    const characterCounter = document.getElementById(
      e.target.id.slice(0, -1) + "2"
    );
    const valentineButton = document.getElementById(
      e.target.id.slice(0, -1) + "3"
    );

    characterCounter.textContent = "Min: 250 / " + characterCount;
    if (characterCount >= 250) {
      characterCounter.classList.add("green");
      valentineButton.classList.add("pink");
    } else {
      characterCounter.classList.remove("green");
      valentineButton.classList.remove("pink");
    }

    // Loops through name buttons to detect if all elements have a pink border
    // If true, then remove opacity from submit messages button
    checkIfComplete();
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
