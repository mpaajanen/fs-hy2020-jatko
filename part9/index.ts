import express from 'express';
const app = express();
import qs from 'qs';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.use(express.json());

app.set('query parser', (str: string) => qs.parse(str));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const h = req.query.height;
  const w = req.query.weigth;
  const height = Number(h);
  const weigth = Number(w);
  if (isNaN(Number(height)) || isNaN(Number(weigth))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }
  const bmiDesc = calculateBmi(Number(height), Number(weigth));
  const result = { weigth, height, bmi: bmiDesc };
  return res.json(result);
});

const onlyNumbers = (arr: Array<number>): boolean => {
  return arr.every(e => {
    return typeof e === 'number';
  });
};

app.post('/exercise', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.daily_exercises || !req.body.target){
      return res.status(400).json({
        error: 'parameters missing'
      });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  if (!onlyNumbers(req.body.daily_exercises) || !onlyNumbers([req.body.target])) {
    return res.status(400).json({
      error: 'malformatted parameters'
      });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const hours: Array<number> = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: number = req.body.target;
  const result = calculateExercises(hours, target);
  // return res.json(req.body);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});