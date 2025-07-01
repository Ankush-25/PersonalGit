const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
var ObjectId = require("mongodb").ObjectId;

dotenv.config();
const mongoUri = process.env.MONGO_DB_URI;
let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
}

async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("personalGitClone");
    const userCollection = db.collection("users");
    const user = await userCollection.find({}).toArray();

    res.json(user);
  } catch (error) {
    console.error("Error in Signup", error);
    res.status(500).send("Server Error");
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("personalGitClone");
    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error during login :", error);
    res.status(500).send("Server error");
  }
}

async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = client.db("personalGitClone");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "The User is Already Exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repositories: [],
      following: [],
      starRepo: [],
    };

    const result = await userCollection.insertOne(newUser);
    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ "Token:": token, userId: result.insertedId });
  } catch (error) {
    console.error("Error in Signup", error);
    res.status(500).send("Server Error");
  }
}

async function getUserProfile(req, res) {
  const currentId = req.params.id;
  try {
    await connectClient();
    const db = client.db("personalGitClone");
    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(currentId) });
    if (!user) {
      return res.status(404).json({ message: "The User Not Found!" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in Signup", error);
    res.status(500).send("Server Error");
  }
}


async function updateUserProfile(req, res) {
  await connectClient();
  const db = client.db("personalGitClone");
  const userCollection = db.collection("users");
  const currentId = req.params.id;
  const { email, password } = req.body;
  try {
    let updateFields = { email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const result = await userCollection.findOneAndUpdate(
      {
        _id: new ObjectId(currentId),
      },
      {
        $set: updateFields,
      },
      {
        returnDocument: "after",
      }
    );


    if (!result) {
      return res.status(404).json({
        message: "The User details are Not Updated please try agian later!",
      });
    }

    res.send({ "the user is updated Successfully ": result });
    
  } catch (error) {
    console.error("Error while Updating!", error);
    res.status(500).send("Server Error");
  }
}

async function deleteUserProfile(req, res) {
  const currentId = req.params.id;
  try {
    await connectClient();
    const db = client.db("personalGitClone");
    const userCollection = db.collection("users");
    const result = await userCollection.deleteOne({
      _id: new ObjectId(currentId),
    });
    if (result.deleteCount == 0) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.json({ message: "User deleted Successfully!" });
  } catch (error) {
    console.error("Error while Deleting!", error);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getAllUsers,
  login,
  signup,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
