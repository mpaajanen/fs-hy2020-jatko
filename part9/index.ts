import express from 'express';
const app = express();
import qs from 'qs';
import calculateBmi from './bmiCalculator';

app.set('query parser', (str: string) => qs.parse(str));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const h = req.query.height
  const w = req.query.weigth
  const height = Number(h)
  const weigth = Number(w)
  if (isNaN(Number(height)) || isNaN(Number(weigth))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    })
  }
  const bmiDesc = calculateBmi(Number(height), Number(weigth));
  const result = { weigth, height, bmi: bmiDesc }
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});