import express from 'express';
import config from 'config';
import "./utils/dbConnect.js";
import router from './controllers/Movies/index.js';

const app = express();
app.use(express.json());
const PORT = config.get("PORT") || 5005;

app.get('/', (req, res) => {
    res.send(`Server is up and running in port ${PORT}.`);
});

app.use('/movies', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});