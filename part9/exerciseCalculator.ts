interface ExerciseResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseValues {
  target: number,
  hours: Array<number>
}

const parseArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments.');

  const hours = args.splice(2, args.length - 3).map(hours => Number(hours));
  hours.map(value => {
    if (isNaN(value)) throw new Error('Exercise values must be numbers.');
    
  });
  if (!isNaN(Number(args[2]))) {
    return {
      target: Number(args[2]),
      hours
    };
  } else {
    throw new Error('Target value was not a number.');
  }
};

const ratings = [
  { rating: 1, description: 'You should exercise more!' },
  { rating: 2, description: 'You\'ve met your target.' },
  { rating: 3, description: 'You shouldn\'t overdo the exercises!' },
];

const calculateExercises = (exerciseHours: Array<number>, target: number): ExerciseResults => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(hours => hours > 0).length;
  const sum = exerciseHours.reduce((prev, curr) => prev + curr, 0);
  const average = (sum / periodLength) || 0;
  const success = average >= target;
  const rating = average >= target * 1.25 ? 3 : success ? 2 : 1;
  const ratingDescription = ratings.find(r => r.rating === rating) || { rating: 0, description: '' };
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescription.description,
    target,
    average
  };
};

try {
  const { target, hours } = parseArgs(process.argv);
  // console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
