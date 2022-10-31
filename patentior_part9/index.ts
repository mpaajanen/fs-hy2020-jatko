import express from 'express';
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});