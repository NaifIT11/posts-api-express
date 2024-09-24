const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

app = express();

app.use(bodyParser.json());

let posts = [];
let postId = posts.length;

app.get("/api/posts" , (req , res) => {
    console.log("GET /api/posts");

    res.json(posts)
});

app.post("/api/posts" , (req , res) => {

    console.log("POST /api/posts");

    const payload = req.body;
    
    if(!payload){
        res.status(400).json({error: {message: "body is required"}})
    }

    const id = ++postId;
    posts.push({id: id, title: payload.title  , description: payload.description})

    console.log(payload);

    res.status(201).json({created: true , id: id});
});


app.put("/api/posts/:id", (req , res) => {
    const postId = req.params.id;
    console.log(`PUT /api/posts/${postId}`)
    
    const payload = req.body;

    if(!payload){
        res.status(400).json({error: {message: "body is required"}})
    }
    const targetPost = posts.find((post) => post.id === postId);

    targetPost.title = payload.title || targetPost.title;
    targetPost.description = payload.description || targetPost.description

    res.json({updated: true , id: postId})
});


app.delete("/api/posts/:id" , (req , res) => {
    const postId = req.params.id;
    
    console.log(`DELETE /api/posts/${postID}`)

    if(postId <= 0){
        res.json({error: {message: "post id should be larger than 0"}})
    }

    const index = posts.findIndex((post) => post.id === parseInt(postId));

    posts.splice(index , 1);

    res.json({deleted: true , id: postId})
});


app.listen(process.env.PORT , () => {
    console.log(`server is running on port ${process.env.PORT}`)
});