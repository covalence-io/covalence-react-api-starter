import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as passport from 'passport';

import './middleware/bearerstrategy';
import './middleware/localstrategy';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
app.use(passport.initialize());

app.use(routes);

//Render the React app if no route is found in the api/auth/etc.
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/server/views/index.html'));
});

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});