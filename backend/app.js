const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());


const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Dummy data for blog posts
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first blog post.' },
    { id: 2, title: 'Second Post', content: 'This is the second blog post.' }
];

// Routes
// Get all posts
app.get('/posts', (req, res) => {
    res.send(posts);
});

// Get a single post by ID
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) {
        res.status(404).send({ error: 'Post not found' });
    } else {
        res.send(post);
    }
});

// Create a new post 
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    const id = posts.length + 1;
    const newPost = { id, title, content };
    posts.push(newPost);
    res.status(201).send(newPost);
});

// Update a post
app.put('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
        res.status(404).send({ error: 'Post not found' });
    } else {
        posts[postIndex] = { id: postId, title, content };
        res.send(posts[postIndex]);
    }
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
        res.status(404).send({ error: 'Post not found' });
    } else {
        posts.splice(postIndex, 1);
        res.sendStatus(204);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

