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
const requiredChoices = 3;
const extraChoices = 3;
let counter = 0;
let nameArr = [];

function renderChoices() {
  const randomNames = getRandomNames(input, requiredChoices)
  for (const [number, item] of randomNames.entries()) {
	document.querySelector(".choice-button-" + number).textContent = item;
  }
}

function addName(name) {
  const nameBtn = document.createElement("button");
  nameContainer.appendChild(nameBtn);
  nameBtn.textContent = name;
  nameArr.push(name);
}

function renderMembers() {
  input.filter(name => !nameArr.includes(name)).forEach(item, i => {
    const memberBtn = document.createElement("button");
    memberBtn.setAttribute("class", "member-button");
    memberContainer.appendChild(memberBtn);
    memberBtn.textContent = name;
  })
}

//  Start button
startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  for (i = 0; i < requiredChoices; i++) {
	const choiceBtn = document.createElement("button").setAttribute("id", "choice-button-" + i);
	btnContainer.appendChild(choiceBtn);
  }
  renderChoices();
});

// Choice buttons
for (i = 0; i < requiredChoices; i++) {
	document.querySelector("choice-button-" + i).addEventListener("click", function (e) {
		renderChoices();
		addName(e.target.textContent);
		if (nameArr.length >= requiredChoices) {
			btnContainer.textContent = "";
			renderMembers();
		}
	});
}

// Member button
document.body.addEventListener("click", function (e) {
  if (e.target.className == "member-button") {
    e.target.classList.add("hidden");
    addName(e.target.textContent);
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
		const td = document.createElement("td")
		td.setAttribute("id", item);
		td.setAttribute("style", "--size: calc( 0/6 )");

    tr.appendChild(th);
    tr.appendChild(td);
    chartBody.appendChild(tr);
  }
}

function updateChart(name) {
	const column = document.getElementById(name).style.cssText
	const amount = parseInt(column.match(/\d/));
	document.getElementById(name).style.cssText = column.replace(/\d/, amount + 1);
	if (amount == 3 - 1) {
		input.splice(input.indexOf(name), 1);
	}
}

createChart(input);

// const len = input.length * 3
// for (let i = 0; i < len; i++) {
//   const randomName = getRandomNames(input, 3)[Math.floor(Math.random() * 3)]
//   updateChart(randomName);
// }
