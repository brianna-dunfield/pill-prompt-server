import express from 'express';
import cors from 'cors';
import medicationRouter from './routes/medications.js';
import { scheduleAllMedications } from './services/scheduler.js';

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());


app.use('/medications', medicationRouter);

scheduleAllMedications();

app.listen(process.env.PORT || 8080, () => {
	console.log('Server is listening on 8080');
});
