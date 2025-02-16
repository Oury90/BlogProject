import express from 'express';
import bodyParser from 'body-parser';
import infromations from './data.js';


const app = express();
const port = 5000;
const all_post = infromations;
let number_post = 3;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", (req, res) =>{
    console.log(infromations)
    res.render("index.ejs", {
        datas: all_post
    })
})
app.get("/form", (req, res) =>{
    res.render("form.ejs")
})

// post a new post
app.post("/post", (req, res) =>{
    const new_id = number_post +1;
    const newPost = {
        id: new_id,
        title: req.body.title,
        content: req.body.content,
        name: req.body.name
    }
    number_post = new_id
    all_post.push(newPost);
    res.redirect("/")
})

// editing a post
app.get("/post/:id", (req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const editPost = all_post.find((post) => post.id === id);
        // res.json(editPost);
        res.render("form.ejs", {
            editPost: editPost,
            edit: "Editing"
        })
    } catch (error) {
        res.status(404).json({message: "The joke not exit"});
    }
})
// post a editing post 
app.post("/post/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const editPost = all_post.find((post) => post.id === id);

    if(req.body.title) editPost.title = req.body.title
    if(req.body.content) editPost.content = req.body.content
    if(req.body.name) editPost.name = req.body.name

    res.redirect("/")
})

app.listen(port, () =>{
    console.log(`This server is running on port ${port}`)
})