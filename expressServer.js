const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/destinations/:destinationId', (req, res) => {
    console.log(req.params.destinationId);
    res.send('Hello World! We learn Express')
})
  

app.get('/', (req, res) => {
  res.send('Hello World! We learn Express')
})

app.post('/', (req, res) => {
    console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})