import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const heightString = req.query.height;
  const weightString = req.query.weight;

  const height = Number(heightString);
  const weight = Number(weightString);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(404).json({ error: "malformatted parameters"});
  }

  const bmi = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi 
  });

});

interface Body {
  dailyExercises: number[];
  target: number;
}

app.post('/exercises', (req, res) => {
  const body: Body = req.body as Body;
  const { dailyExercises, target} = body;

  if (!target || !dailyExercises) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(dailyExercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  if (dailyExercises.some((element) => isNaN(element))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const result = calculateExercises(dailyExercises, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});