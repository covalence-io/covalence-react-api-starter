import * as express from 'express';
import * as cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

app.use(routes);
app.use('*', (req, res) => {
    res.sendFile('./views/index.html');
});

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});