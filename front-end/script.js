//
// Request Wrappers
//

const baseUrl = "http://localhost:3000";

async function getData(path) {
  try {
    return await fetch(baseUrl + path, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (error) {
    alert("Server is out, please contact JoJo.");
    console.log(error);
  }
}

async function postData(path, data) {
  try {
    return await fetch(baseUrl + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    alert("Server is out, please contact JoJo.");
    console.log(error);
  }
}

async function putData(path, data) {
  try {
    return await fetch(baseUrl + path, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    alert("Server is out, please contact JoJo.");
    console.log(error);
  }
}

//
// Globals
//

const leftContainer = document.getElementById("left-container");
const middleContainer = document.getElementById("middle-container");
const rightContainer = document.getElementById("right-container");
const requiredAmount = 3;
const extraAmount = 3;

//
// Helpers
//

// This method gets multiple random items from a list by using the Modern Fisher-Yates Shuffle method
// This method makes duplicates impossible by putting "taken" numbers in the "shuffled part" of the list and only getting a new number from the "unshuffled part".
function generateOptions(arr, n) {
  let result = new Array(n);
  let len = arr.length;
  let taken = new Array(len);

  while (n--) {
    const x = Math.floor(Math.random() * len);

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

async function createExtras() {
  const availableMembers = await getData("/members?taken=false");
  for (const member of availableMembers) {
    const extraButton = document.createElement("button");
    extraButton.textContent = member;
    extraButton.classList.add("extra");
    rightContainer.appendChild(extraButton);
  }
}

function createValentineButton(name) {
  const valentineButton = document.createElement("button");
  leftContainer.appendChild(valentineButton);
  valentineButton.textContent = name;

  const valentines = JSON.parse(localStorage.getItem("valentines")) || [];
  localStorage.setItem("valentines", JSON.stringify([...valentines, name]));

  const column = document.getElementById(name).style.cssText;
  const amount = parseInt(column.match(/\d/));
  document.getElementById(name).style.cssText = column.replace(/\d/, amount + 1);
}

function renderOptions() {
  const limitedMembersWarning =
    "You're one of the last ones to fill this in, so you'll have limited options for the required valentines. Don't worry, you can still pick anyone from the extra memberlist and every submitted message gets send at the same time, so noone gets to know who the last person was.";
  const noMembersWarning =
    "You're one the last ones to fill this in and someone is busy choosing their last valentine, so please wait a few minutes before refreshing the page to get access to the remaining valentine options";

  if (memberNames.length >= requiredAmount) {
    const options = generateOptions(memberNames, requiredAmount);
  } else {
    const options = generateOptions(memberNames, memberNames.length);
    middleContainer.innerHTML = "";
    createOptionButtons(options.length);
    if (memberNames.length == 0) alert(noMembersWarning);
    else alert(limitedMembersWarning);
  }

  localStorage.setItem("options", JSON.stringify(options));

  document.querySelectorAll(".option").forEach((v, i) => {
    v.textContent = options[i];
    const member = getData(`/members?name=${options[i]}`);
    member["required_count"] += 1;
    if (member["required_count"] >= requiredAmount) {
      member["taken"] = true;
    }
    putData(`/members/${member}`, member);
  });
}

function createOptionButtons(amount) {
  for (let i = 0; i < amount; i++) {
    const choiceButton = document.createElement("button");
    choiceButton.classList.add("option");
    middleContainer.appendChild(choiceButton);
  }
}

function loadStorage(options) {
  const valentines = JSON.parse(localStorage.getItem("valentines")) || [];
  for (const valentine of valentines) {
    createValentineButton(valentine);
  }

  if (valentines.length < requiredAmount) {
    createOptionButtons(options.length);
    document.querySelectorAll(".option").forEach((v, i) => (v.textContent = options[i]));
  } else {
    createExtras();
  }
}

//
// Listeners
//

const startButton = document.getElementById("start-button");
const valentineButtons = document.querySelectorAll(".valentine");
const optionButtons = document.querySelectorAll(".option");
const extraButtons = document.querySelectorAll(".extra");
const sendButton = document.getElementById("send-button");
const passwordButton = document.getElementById("password-button");

startButton.addEventListener("click", () => {
  startButton.setAttribute("class", "hidden");
  const options = JSON.parse(localStorage.getItem("options")) || [];
  if (options) {
    loadStorage(options);
  } else {
    createOptionButtons(options);
    renderOptions();
  }
});

valentineButtons.forEach((valentineButton) => {
  valentineButton.addEventListener("click", () => {});
});

optionButtons.forEach((optionButton) => {
  optionButton.addEventListener("click", () => {
    createValentineButton(optionButton.textContent);

    const options = JSON.parse(localStorage.getItem("options"));
    const passedOptions = options.filter((v) => v != optionButton.textContent);
    passedOptions.forEach((v) => {
      const member = getData(`/members?name=${v}`);
      member["required_count"] -= 1;
      if (member["required_count"] < requiredAmount) {
        member["taken"] = false;
      }
      putData(`/members/${member}`, member);
    });

    const valentines = JSON.parse(localStorage.getItem("valentines"));
    if (valentines.length < requiredAmount) {
      renderOptions();
    } else {
      middleContainer.innerHTML = "";
      createExtras();
    }
  });
});

extraButtons.forEach((extraButton) => {
  extraButton.addEventListener("click", () => {
    createValentineButton(extraButton.textContent);
    extraButton.classList.add("hidden");
  });
});

sendButton.addEventListener("click", async () => {
  const valentines = JSON.parse(localStorage.getItem("valentines"));
  let messages = {};
  valentines.forEach((valentine) => {
    const id = members.find((member) => member.name === valentine).id;
    const message = messages[valentine + "-textarea"];
    messages[id] = message;
  });
  postData("/messages", messages);
});

passwordButton.addEventListener("click", async () => {
  const chartPassword = document.getElementById("chart-password");
  const res = await postData("/auth", { password: chartPassword.value });
  if (res.status == 200) {
    document.getElementById("chart-auth").classList.add("hidden");
    document.querySelectorAll(".chart-column").forEach((column) => {
      column.classList.remove("hidden");
    });
  } else if (res.status == 403) {
    alert("Password incorrect!");
  } else {
    alert("Something went wrong, contact JoJo. Error code: ", res.status);
  }
});

//
// Initialization
//

function positionChartAuth() {
  const chart = document.getElementById("valentines-chart");
  const auth = document.getElementById("chart-auth");
  const authLeft = chart.offsetLeft + chart.offsetWidth / 2;
  const authTop = chart.offsetTop + chart.offsetHeight / 2;
  auth.style.left = authLeft - auth.offsetWidth / 2 + "px";
  auth.style.top = authTop + auth.offsetHeight / 2 + "px";
}

async function createChart() {
  const memberNames = await getData("/members");
  const chartBody = document.getElementById("chart-body");
  for (const member of memberNames) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = member["name"];
    const td = document.createElement("td");
    td.setAttribute("id", member);
    const totalChosen = member["required_count"] + member["extra_count"];
    td.setAttribute("style", "--size: calc( " + totalChosen + "/10 )");
    td.classList.add("chart-column");
    td.classList.add("hidden");

    tr.appendChild(th);
    tr.appendChild(td);
    chartBody.appendChild(tr);
    positionChartAuth();
  }
}

await createChart();
