require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { makeCommit } = require("./controllers/commit");
const { makePush } = require("./controllers/push");
const { makeRevert } = require("./controllers/revert");
const { makePull } = require("./controllers/pull");
const { Server } = require("socket.io");

yargs(hideBin(process.argv))
  .command("Start", "Starts a new Server", {}, startServer)
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Aadding file to the staging",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add To the Stagging area",
        type: "String",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "making a commit",
    (yargs) => {
      yargs.positional("commit message", {
        describe: "File is being commited",
        type: "string",
      });
    },

    (argv) => {
      makeCommit(argv.message);
    }
  )
  .command("push", "Pushing a new code", {}, makePush)
  .command("pull", "Pulling a new code", {}, makePull)
  .command(
    "revert <commitId >",
    "reverting a new code",
    (yargs) => {
      yargs.positional("commitId", {
        describe: "reverting the previous code",
        type: "String",
      });
    },
    (argv) => {
      makeRevert(argv.commitId);
    }
  )

  .demandCommand(1, "You need atleast one command")
  .help().argv;

function startServer() {
  const app = express();
  const port = process.env.Port || 3000;

  app.use(bodyParser.json());
  app.use(express.json());

  const mongoURI = process.env.MONGO_DB_URI;
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB is Connected"))
    .catch((error) => console.log("Unable to connect with MongoDB :", error));

  console.log("Started is Server");

  app.use(cors({ origin: "*" }));

  app.get("/", (req, res) => {
    res.send("Welcome!:");
  });

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  let user = 'text';
  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("===========");
      console.log(user);
      console.log("===========");
      socket.join(user);
    });
  });
  const db = mongoose.connection;
  db.once("open", async () => {
    console.log("crud Opreation Called");
    //CRUD Opreations
  });
  httpServer.listen(port, () => {
    console.log("Server is running in :", port);
  });
}
