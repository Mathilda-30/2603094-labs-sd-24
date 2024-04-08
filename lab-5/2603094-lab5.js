const express = require('express');
const app = express();
const PORT = 3000;


let cars = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "Silver",
    engineType: "V6"
     
   
  },
  {
    id: 2,
    make: "Honda",
    model: "Accord",
    year: 2018,
    color: "Black",
    engineType: "Inline-4" 
  }
];


app.use(express.json());


app.get('/cars', (req, res) => {
  res.json(cars);
});


app.get('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(car => car.id === id);
  if (!car) {
    res.status(404).json({ error: 'Car not found' });
  } else {
    res.json(car);
  }
});


app.post('/cars', (req, res) => {
  const newCar = req.body;
  newCar.id = cars.length + 1; // Generate a new ID
  cars.push(newCar);
  res.status(201).json(newCar);
});


app.put('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedCar = req.body;
  const index = cars.findIndex(car => car.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Car not found' });
  } else {
    cars[index] = { ...cars[index], ...updatedCar };
    res.json(cars[index]);
  }
});


app.delete('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cars.findIndex(car => car.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Car not found' });
  } else {
    cars.splice(index, 1);
    res.sendStatus(204);
  }
});


app.post('/cars/:id/specifications', (req, res) => {
  const id = parseInt(req.params.id);
  const { engineType, color, modelYear } = req.body;
  const index = cars.findIndex(car => car.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Car not found' });
  } else {
    if (!cars[index].specifications) {
      cars[index].specifications = [];
    }
    cars[index].specifications.push({ engineType, color, modelYear });
    res.status(201).json(cars[index].specifications);
  }
});


app.delete('/cars/:id/specifications/:specId', (req, res) => {
  const carId = parseInt(req.params.id);
  const specId = req.params.specId;
  const carIndex = cars.findIndex(car => car.id === carId);
  if (carIndex === -1) {
    res.status(404).json({ error: 'Car not found' });
  } else {
    const specIndex = cars[carIndex].specifications.findIndex(spec => spec.id === specId);
    if (specIndex === -1) {
      res.status(404).json({ error: 'Specification not found' });
    } else {
      cars[carIndex].specifications.splice(specIndex, 1);
      res.sendStatus(204);
    }
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
