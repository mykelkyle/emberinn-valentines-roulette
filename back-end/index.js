const discord = require("./discord");
const schedule = require("node-schedule");
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env["PORT"];

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("This is the Back-end of the Ember Valentine's Event!");
});

app.post("/send", async (req, res) => {
  try {
    const job = schedule.scheduleJob("37 21 16 2 *", async () => {
      for (const [memberID, text] of Object.entries(req.body)) {
        await discord(memberID, text);
      }
    });
  } catch (error) {
    console.log(error);
  }
  res.end();
});

app.post("/auth", (req, res) => {
  if (req.body["password"] == process.env["CHART_PASSWORD"]) {
    res.status(200).end();
  } else {
    res.status(403).end();
  }
});

app.get("/eden", async (req, res) => {
  discord("922872362213445683", "<3");
  discord("250957620930805761", "test");
  console.log("test");
  res.end();
});
