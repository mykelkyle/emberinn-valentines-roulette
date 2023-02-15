const members = [
  [
    "Hans",
    "https://cdn.discordapp.com/avatars/166775206336135168/3e01b4d9387308f042fac3632fdec154.webp?size=160",
    "166775206336135168",
  ],
  [
    "Brandon",
    "https://cdn.discordapp.com/avatars/174323796423999488/6938504c07f36ed20e64e1a47877ec5d.webp?size=160",
    "174323796423999488",
  ],
  [
    "Mykel",
    "https://cdn.discordapp.com/avatars/210556882442518528/7d6101dcf27e434b42d8ecc306ab4f3a.webp?size=160",
    "210556882442518528",
  ],
  [
    "Zi Shan",
    "https://cdn.discordapp.com/avatars/248441976947474432/34cdfdb832a495eb167317c1f1c478ff.webp?size=160",
    "248441976947474432",
  ],
  [
    "Jojo",
    "https://cdn.discordapp.com/avatars/250957620930805761/ff6bc719ccc1366340495e4ecb958cda.webp?size=160",
    "250957620930805761",
  ],
  [
    "Mars",
    "https://cdn.discordapp.com/avatars/276879571599622166/9716a4a599051ca2274bc48d698a7d55.webp?size=160",
    "276879571599622166",
  ],
  [
    "Wild",
    "https://cdn.discordapp.com/avatars/286999428492165124/3d0ec6ac79b5f07a98c9efd9373241c9.webp?size=160",
    "286999428492165124",
  ],
  [
    "Salvi",
    "https://cdn.discordapp.com/avatars/402114901608235008/0854b8bee2cd1ad259595036ead7b960.webp?size=160",
    "402114901608235008",
  ],
  [
    "Yari",
    "https://cdn.discordapp.com/avatars/469918860070486027/1b840a3da967f897e538894a29984197.webp?size=160",
    "469918860070486027",
  ],
  [
    "Kat",
    "https://cdn.discordapp.com/avatars/483338046117511178/94bcd1ebf57ecd972a13a10c5db2700f.webp?size=160",
    "483338046117511178",
  ],
  [
    "Sid",
    "https://cdn.discordapp.com/avatars/709446231331700767/1495e9a2846a2b9287deef15bf8c6999.webp?size=160",
    "709446231331700767",
  ],
  [
    "Klara",
    "https://cdn.discordapp.com/avatars/710953613043826768/b7060beaa14320cffa669ccc6015b177.webp?size=160",
    "710953613043826768",
  ],
  [
    "Dar",
    "https://cdn.discordapp.com/avatars/737299797685305344/c3318adf7cb77694c8fc9af466c4872d.webp?size=160",
    "737299797685305344",
  ],
  [
    "JB",
    "https://cdn.discordapp.com/avatars/770132074563764235/8b25a98afd93dc2d166deee745fd6a62.webp?size=160",
    "770132074563764235",
  ],
  [
    "Lucy",
    "https://cdn.discordapp.com/avatars/812478009164431400/e7ff13e548e63335f363374cc2a3355a.webp?size=160",
    "812478009164431400",
  ],
  ["Saigui", "", "831820579844915201"],
  [
    "Siwar",
    "https://cdn.discordapp.com/avatars/850071420733751387/680c2e49a57ac737276ce754f9503f4a.webp?size=160",
    "850071420733751387",
  ],
  [
    "Anna",
    "https://cdn.discordapp.com/avatars/854339067734917141/c31743375a5f4a76033a9d5f4dedf85c.webp?size=160",
    "854339067734917141",
  ],
  [
    "Nicoll",
    "https://cdn.discordapp.com/avatars/885682003045920790/569cf5ebd54d6321d225000c6b26cbe2.webp?size=160",
    "885682003045920790",
  ],
  [
    "Eden",
    "https://cdn.discordapp.com/avatars/922872362213445683/c3f0c73eda21ba6d7b2d1ba109cdf402.webp?size=160",
    "922872362213445683",
  ],
];
let names = [];
members.forEach((item) => names.push(item[0]));

const startBtn = document.getElementById("start-button");
const nameContainer = document.getElementById("name-container");
const memberContainer = document.getElementById("member-container");
const btnContainer = document.getElementById("button-container");
const requiredChoices = 3;
const extraChoices = 3;
let nameArr = [];

function renderChoices() {
  const randomNames = getRandomNames(names, requiredChoices);
  document.querySelectorAll(".choice-button").forEach((choiceBtn, i) => {
    choiceBtn.textContent = randomNames[i];
  });
  localStorage.setItem("generatedChoices", randomNames);
}

function addName(name) {
  const nameBtn = document.createElement("button");
  nameContainer.appendChild(nameBtn);
  nameBtn.textContent = name;
  nameArr.push(name);
  localStorage.setItem("choices", nameArr);
}

function renderMembers() {
  for (const member of names) {
    if (nameArr.includes(member[0])) continue;

    const memberBtn = document.createElement("button");
    memberBtn.setAttribute("class", "member-button");
    memberBtn.setAttribute("onclick", "clickMember(this)");
    memberContainer.appendChild(memberBtn);
    memberBtn.textContent = member[0];
  }
}

function renderChoiceButtons() {
  for (const _ of [...Array(requiredChoices)]) {
    const choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice-button");
    choiceBtn.setAttribute("onclick", "clickChoice(this)");
    btnContainer.appendChild(choiceBtn);
  }
}

async function clickStart() {
  startBtn.setAttribute("class", "hidden");

  // let tempObj = {};
  // for (const member of members) {
  //   tempObj[member[2]] = "Testing for Wild :)";
  // }
  // try {
  //   await fetch("http://localhost:3000", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(tempObj),
  //   });
  // } catch (error) {
  //   alert("Server is out, please save your messages locally and contact JoJo.");
  //   console.log(error);
  // }

  if (localStorage.getItem("generatedChoices") != null) {
    backupChoices();
  } else {
    renderChoiceButtons();
    renderChoices();
  }
}

function clickChoice(e) {
  addName(e.textContent);
  if (nameArr.length >= requiredChoices) {
    btnContainer.textContent = "";
    renderMembers();
  } else {
    renderChoices();
  }
}

function clickMember(e) {
  e.setAttribute("class", "hidden");
  addName(e.textContent);
}

// async function clickSend() {
//   try {
//     const res = await fetch("http://localhost:3000/auth", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ password: document.getElementById(passwordEl).value }),
//     });
//   } catch (error) {
//     alert("Server is out, please save your messages locally and contact JoJo.");
//     console.log(error);
//   }
// }

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

function backupChoices() {
  let choices = localStorage.getItem("choices");
  if (choices != null) {
    choices = choices.split(",");
    for (const choice of choices) {
      const nameBtn = document.createElement("button");
      nameContainer.appendChild(nameBtn);
      nameBtn.textContent = choice;
      nameArr.push(choice);
    }
  }

  if (choices.length < 3) {
    renderChoiceButtons();
    document.querySelectorAll(".choice-button").forEach((choiceBtn, i) => {
      choiceBtn.textContent = localStorage.getItem("generatedChoices").split(",")[i];
    });
  } else {
    renderMembers();
  }
}

function createChart() {
  const chartBody = document.getElementById("name-chart-data");
  for (item of names) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = item;
    const td = document.createElement("td");
    td.setAttribute("id", item);
    td.setAttribute("style", "--size: calc( 0/6 )");
    td.classList.add("chart-column");
    td.classList.add("hidden");

    tr.appendChild(th);
    tr.appendChild(td);
    chartBody.appendChild(tr);
  }
}

function updateChart(name) {
  const column = document.getElementById(name).style.cssText;
  const amount = parseInt(column.match(/\d/));
  document.getElementById(name).style.cssText = column.replace(/\d/, amount + 1);
  if (amount == 3 - 1) {
    names.splice(names.indexOf(name), 1);
  }
}

createChart(names);
const chart = document.getElementById("name-chart");
const auth = document.getElementById("auth");
const authLeft = chart.offsetLeft + chart.offsetWidth / 2;
const authTop = chart.offsetTop + chart.offsetHeight / 2;
auth.style.left = authLeft - auth.offsetWidth / 2 + "px";
auth.style.top = authTop + auth.offsetHeight / 2 + "px";

const len = names.length * 3;
for (let i = 0; i < len; i++) {
  const randomName = getRandomNames(names, 3)[Math.floor(Math.random() * 3)];
  updateChart(randomName);
}

async function openChart(passwordEl) {
  try {
    const res = await fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: document.getElementById(passwordEl).value }),
    });
    if (res.status == 200) {
      document.getElementById("auth").classList.add("hidden");
      document.querySelectorAll(".chart-column").forEach((column) => {
        column.classList.remove("hidden");
      });
    } else if (res.status == 403) {
      alert("Password incorrect!");
    }
  } catch (error) {
    alert("Server is out, please save your messages locally and contact JoJo.");
    console.log(error);
  }
}
