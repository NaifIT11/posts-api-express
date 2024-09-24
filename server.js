const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const postRouter = require("./routes/router.posts");

require('dotenv').config();

app = express();

app.use(bodyParser.json());

//modularity
app.use("/api/posts", postRouter)


app.listen(process.env.PORT , () => {
    console.log(`server is running on port ${process.env.PORT}`)
});