const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let articles = [
  {
    id: 1,
    title: "My first blog",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores cum explicabo iste magnam voluptatibus excepturi nesciunt non illum blanditiis vel, iusto dolore saepe quas numquam labore pariatur nobis assumenda quo recusandae eligendi, hic sed similique adipisci at. Facilis commodi, provident recusandae sunt, fuga unde debitis, quo ut consequatur esse iusto mollitia quaerat voluptatibus inventore possimus labore suscipit harum adipisci rem atque repellendus ratione molestiae.",
  },
  {
    id: 2,
    title: "I went to Versailles",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, tempora numquam delectus tempore cumque nemo accusantium porro, eaque doloremque aliquid mollitia incidunt odio temporibus nam placeat veritatis minus illo eveniet unde esse qui eius. Voluptate mollitia quos vero quibusdam? Architecto modi adipisci, omnis voluptatum autem, facere neque provident asperiores iste tempora numquam sint perspiciatis ipsa ducimus debitis, id earum suscipit incidunt voluptas nisi molestias consequatur inventore error consectetur? Tenetur atque sit, doloribus optio mollitia obcaecati maiores? Accusamus laborum ipsum molestiae nam ipsam velit praesentium eum quae quo ea obcaecati quam sit fuga ipsa fugit enim, rem dolore minus? Quod laborum rerum maxime voluptate consequuntur quasi rem temporibus quisquam at quas suscipit earum minima pariatur aliquid nesciunt inventore beatae sit omnis maiores tenetur alias modi dolor, animi est? Mollitia?",
  },
];

let articleId = 3;

let users = [
  {
    id: 1,
    name: "Sandrine",
    age: 39,
    sexe: "F",
  },
  {
    id: 2,
    name: "Maria",
    age: 28,
    sexe: "F"
  }
];

let userId = 3;

app.get("/api/", (req, res) => {
  res.send("Hello World bis!");
});


app.get("/api/articles/", (req, res) => {
  res.json(articles);
});

app.get("/api/users/", (req, res) => {
  res.json(users);
})

app.post("/api/articles/", (req, res) => {
  res.status(200).send("Data published successfully");
  if (!req.body.title && !req.body.content) return;
  else {
    const article = {
      id: articleId,
      title: req.body.title,
      content: req.body.content
    };
    articles.push(article);
    articleId++;
    console.log(articles);
  }
});

app.post("/api/users/", (req, res) => {
  
  if(!req.body.name || !req.body.age || !req.body.sexe ){
    res.status(400).send("missing name, age or sexe data");
    return;
  }
  else {
    const user = {
      id: userId,
      name: req.body.name,
      age: req.body.age,
      sexe: req.body.sexe
    }
    users.push(user);
    userId++;
    console.log(users);
    res.status(200).send("Data published succesfully");
  }
})

app.get("/api/articles/:id/", (req, res) => {
  const id = req.params.id;
  const article = articles.find((object) => object.id === Number(id));
  res.json(article);
});

app.get("/api/users/:id/", (req, res) => {
  const id = req.params.id;
  const user = users.find((object) => object.id === Number(id));
  res.json(user);
})

app.delete("/api/users/:id/", (req, res) => {
  const id = req.params.id;
  users = users.filter((object) => object.id !== Number(id));
  res.status(204).send();
  console.log(users);
})

app.delete("/api/articles/:id/", (req, res) => {
  const id = req.params.id;
  articles = articles.filter((object) => object.id !== Number(id));
  res.status(204).send();
  console.log(articles);
});

app.put("/api/articles/:id/", (req, res) => {
  const id = req.params.id;
  if (req.body.title || req.body.content) {
    let index = articles.findIndex((object) => object.id === Number(id));
    if (req.body.title) {
      articles[index].title = req.body.title;
    }
    if (req.body.content) {
      articles[index].content = req.body.content;
    }
    res.status(200).send("data updated succesfully");
    console.log(articles);
  } else {
    res.status(404).send("data not found");
  }
});

app.put("/api/users/:id/", (req, res) => {
  const id = req.params.id;
  if (req.body.name || req.body.age || req.body.sexe) {
    let index = users.findIndex((object) => object.id === Number(id));
    if (req.body.name) {
      users[index].name = req.body.name;
    }
    if (req.body.age) {
      users[index].age = req.body.age;
    }
    if (req.body.sexe) {
      users[index].sexe = req.body.sexe;
    }
    res.status(200).send("data updated succesfully");
    console.log(users);
  } else {
    res.status(404).send("data not found");
  }
})
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
