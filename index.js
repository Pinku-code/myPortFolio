const { log } = require("console");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path"); // Import the path module
const app = express();
const port = 8000;

// console.log(path.join(__dirname,"/assets"));
const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
});
