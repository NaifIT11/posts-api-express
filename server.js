const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

app = express();

app.use(bodyParser.json());

let posts = [];
let postId = 0;

app.get("/api/posts" , (req , res) => {
    res.json(posts)
});

app.post("/api/posts" , (req , res) => {

    console.log("POST /api/posts");

    const payload = req.body;

    posts.push({id: postId++, ...payload})

    console.log(payload);

    res.json({created: true});
});



app.listen(process.env.PORT , () => {
    console.log(`server is running on port ${process.env.PORT}`)
});