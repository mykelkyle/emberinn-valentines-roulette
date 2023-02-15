const discord = require("./discord");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    for (const [memberID, text] of Object.entries(req.body)) {
      await discord(memberID, text);
    }
  } catch (error) {
    console.log(error);
  }
  res.end();
});
app.get("/eden", async (req, res) => {
  discord("922872362213445683", "test");
  console.log("test");
  res.end();
});
