// backend\index.js
const express = require('express');
const PORT = 3000;
const dbURL = "mongodb+srv://niko-jigo:nikolozi1234@clusterpractice.34wj6.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPractice";
const mongoose = require('mongoose');
const Task = require('./models/task');
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

mongoose.connect(dbURL)
.then(() => {
    console.log('app is connected to db')
})
.catch(err => {
    console.log(err);
})

// Handling requests
app.get('/tasks', (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(500).json({ error: err.message }))
})

app.post('/tasks/create/:title', (req, res) => {
    const task = new Task({ title: req.params.title })
    task.save()
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }))
})
app.delete('/tasks/delete/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }))
});
//toggle if is done or not
app.put('/tasks/update/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, { isDone: !req.body.isDone })

        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }))
})

