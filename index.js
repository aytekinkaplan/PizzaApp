const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

let pizzas = [
  { id: 1, name: "Margarita", toppings: ["mozzarella", "domates"] },
  { id: 2, name: "Pepperoni", toppings: ["mozzarella", "pepperoni"] },
];

app.get("/", (req, res) => {
  res.send("Pizza APP is running!");
});

app.get("/pizzas", (req, res) => {
  res.json(pizzas);
});

app.get("/pizzas/:id", (req, res) => {
  const pizza = pizzas.find((p) => p.id === parseInt(req.params.id));
  if (pizza) {
    res.json(pizza);
  } else {
    res.status(404).send("Pizza is not found");
  }
});

app.post("/pizzas", (req, res) => {
  const newPizza = {
    id: pizzas.length + 1,
    name: req.body.name,
    toppings: req.body.toppings,
  };
  pizzas.push(newPizza);
  res.status(201).json(newPizza);
});

app.put("/pizzas/:id", (req, res) => {
  const pizza = pizzas.find((p) => p.id === parseInt(req.params.id));
  if (pizza) {
    pizza.name = req.body.name || pizza.name;
    pizza.toppings = req.body.toppings || pizza.toppings;
    res.json(pizza);
  } else {
    res.status(404).send("Pizza is not found");
  }
});

app.delete("/pizzas/:id", (req, res) => {
  pizzas = pizzas.filter((p) => p.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
