const express = require("express");
const postRouter = express.Router();


postRouter.use((req , res , next) => {
    res.setHeader("X-Github-Account" , "NaifIT11")
    next();
})

let posts = [];
let postId = posts.length;

postRouter.get("/" , (req , res) => {
    console.log("GET /api/posts");

    res.json(posts)
});

postRouter.post("/" , (req , res) => {

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


postRouter.put("/:id", (req , res) => {
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


postRouter.delete("/:id" , (req , res) => {
    const postId = req.params.id;
    
    console.log(`DELETE /api/posts/${postID}`)

    if(postId <= 0){
        res.json({error: {message: "post id should be larger than 0"}})
    }

    const index = posts.findIndex((post) => post.id === parseInt(postId));

    posts.splice(index , 1);

    res.json({deleted: true , id: postId})
});


module.exports = postRouter;