const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const router = require('./routes/index.routes');
const db = require('./db/database');
const cors = require('cors');

app.use(cors());
app.use(express.json());
db()

app.use('/api', router);
app.get('/', (req, res) => {
    return res.status(200).json({
        status: "running",
        message: "server connected"
    })
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
