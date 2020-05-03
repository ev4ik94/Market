const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

var dataProducts = fs.readFileSync("./dataBase/products.json");
var dataContentProd = JSON.parse(dataProducts);

var dataCat = fs.readFileSync("./dataBase/categories.json");
var dataContentCat = JSON.parse(dataCat);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/products', (req, res) => {
  res.send({ products: dataContentProd });
});


app.get('/products/:id', (req, res) => {
  let id = req.params.id?req.params.id:null;
  let prod = dataContentProd.filter(item=>item.catId===Number(id));
  res.send({ products: prod });
});


app.get('/categories', (req, res) => {
  res.send({ categories: dataContentCat });
});




app.listen(port, () => console.log(`Listening on port ${port}`));