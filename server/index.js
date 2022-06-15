const express = require("express");
const graphQLHttp = require("express-graphql");
const schema = require("./src/schema");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const database = require("./config/database");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
var cors = require('cors')
const publicPath = path.join(__dirname, './', 'build');

const port = process.env.PORT || 3000;

const imageStorage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    console.log(file)
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 5000000
  },
  fileFilter(req, file, cb) {
    console.log(file)
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  }
});

mongoose.Promise = global.Promise;
mongoose.connect(
  database.mongoConnectionString,
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("db connection is okay");
    }
  }
);

const app = express();
app.use(cors());

const loggingMiddleware = (req, res, next) => {
  const token = req.get("access-token");
  if (!token) next();
  else {
    try {
      const verifyOptions = {
        expiresIn: "1d",
        algorithm: ["RS256"]
      };
      const isLegit = jsonwebtoken.verify(
        token,
        process.env.JWT_SECRET,
        verifyOptions
      );

      req.userid = isLegit.id;
      next();
    } catch (err) {
      next();
    }
  }
};

app.post("/upload", imageUpload.single("photo"), (req, res) => {
  return res.status(200).json({ file: req.file });
});

app.use(loggingMiddleware);
app.use(express.static("uploads"));
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use(
  "/graph",
  graphQLHttp({
    schema: schema,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log("server running at port", port);
});
