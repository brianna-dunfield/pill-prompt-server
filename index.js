import express from 'express';
import cors from 'cors';
import medicationRouter from './routes/medications.js';

const app = express();
app.use(cors());
app.use(express.static('public'));

app.use('/medications', medicationRouter);

app.listen(process.env.PORT || 8080, () => {
	console.log('Server is listening on 8080');
});
