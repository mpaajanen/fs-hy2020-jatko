import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import cors from 'cors';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('pinged');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});