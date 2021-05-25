const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const todos = [{ id: 1, title: "todo 1", description: "Todos description.." }];

app.get("/todos/", function (_, res) {
  res.status(200).json(todos);
});

app.post("/todos/", (request, response) => {
  todos.push({
    title: request.body.title,
    description: request.body.description,
    id: todos.length + 1,
  });
  response.status(201).json(todos[todos.length - 1]);
});

app.put("/todos/:id", (request, response) => {
  const id = request.params.id;
  const updatedTodo = request.body;

  updatedTodo.id = parseInt(id);
  const index = todos.findIndex((item) => item.id === parseInt(id));
  todos[index].title = updatedTodo.title;
  todos[index].description = updatedTodo.description;
  response.status(201).json(todos[index]);
});

app.delete("/todos/:id", (request, response) => {
  var id = parseInt(request.params.id);
  const index = todos.findIndex((item) => item.id === parseInt(id));
  todos.splice(index, 1);
  response.status(201).json();
});

app.listen(port);
