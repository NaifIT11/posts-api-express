const path = require("path");
const express = require("express");
require('dotenv').config();

app = express();

app.use(express.json());

let posts = [];
let postId = 0;

app.get("/api/posts" , (req , res) => {
    res.json(posts)
});

app.post("/api/posts" , (req , res) => {

    console.log("POST /api/posts");

    const payload = req.body;

    posts.push(payload)

    console.log(payload);

    res.json({created: true});
});



app.listen(process.env.PORT , () => {
    console.log(`server is running on port ${process.env.PORT}`)
});