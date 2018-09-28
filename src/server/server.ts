import * as express from 'express';
import * as cors from 'cors';
import routes from './routes';
import * as path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

app.use(routes);

//Render the React app if no route is found in the api/auth/etc.
app.use('*', (req, res) => {
    console.log(path.join(__dirname));
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});