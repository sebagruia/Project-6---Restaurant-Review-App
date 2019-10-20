const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res)=>{
    res.json("It's working well");
});


app.listen(8000, ()=>{
    console.log("App running on port 8000");
})
