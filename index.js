const express = require('express');
let cors = require('cors');

//import file
const { products } = require('./data');
const app = express();
const port = 3010;

app.use(cors());

app.get('/products/sort/popularity', (req, res) => {
  const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);

  res.json(sortedProducts);
});

app.get('/products/sort/price-high-to-low', (req, res) => {
  const sortedProducts = [...products].sort((a, b) => b.price - a.price);

  res.json(sortedProducts);
});

app.get('/products/sort/price-low-to-high', (req, res) => {
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  res.json(sortedProducts);
});

function filterByRam(productArray, ram) {
  return productArray.filter((product) => product.ram === ram);
}
app.get('/products/filter/ram', (req, res) => {
  const ram = parseInt(req.query.ram, 10);
  if (isNaN(ram)) {
    return res.status(400).json({ error: 'Invalid RAM value' });
  }

  const filteredProducts = filterByRam([...products], ram);
  res.json(filteredProducts);
});

function filterByBrand(productArray, brand) {
  return productArray.filter(
    (product) => product.brand.toLowerCase() === brand.toLowerCase()
  );
}

app.get('/products/filter/brand', (req, res) => {
  const brand = req.query.brand;
  if (!brand) {
    return res.status(400).json({ error: 'Brand parameter is required' });
  }

  const filteredProducts = filterByBrand([...products], brand);
  res.json(filteredProducts);
});

function filterByOs(productArray, os) {
  return productArray.filter(
    (product) => product.os.toLowerCase() === os.toLowerCase()
  );
}

app.get('/products/filter/os', (req, res) => {
  const os = req.query.os;
  if (!os) {
    return res.status(400).json({ error: 'OS parameter is required' });
  }

  const filteredProducts = filterByOs([...products], os);
  res.json(filteredProducts);
});


function filterByPrice(productArray, maxPrice) {
  return productArray.filter(product => product.price <= maxPrice);
}


app.get('/products/filter/price', (req, res) => {
  const price = parseFloat(req.query.price); 
  if (isNaN(price)) {
      return res.status(400).json({ error: 'Valid price parameter is required' });
  }

  const filteredProducts = filterByPrice([...products], price); 
  res.json(filteredProducts); 
});

app.get('/products', (req, res) => {
  res.json(products); 
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
