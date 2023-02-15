const discord = require("./discord");
const schedule = require("node-schedule");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/send", async (req, res) => {
  try {
    console.log("A new person is ready!");
    const date = new Date(2023, 1, 16, 00, 18, 0);
    const job = schedule.scheduleJob(date, async () => {
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
  discord("922872362213445683", "test");
  console.log("test");
  res.end();
});
