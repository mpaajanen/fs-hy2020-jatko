interface ExerciseResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const ratings = [
  { rating: 1, description: 'You should exercise more!' },
  { rating: 2, description: 'You\'ve met your target.' },
  { rating: 3, description: 'You shouldn\'t overdo the exercises!' },
]

const calculateExercises = (exerciseHours: Array<number>, target: number): ExerciseResults => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(hours => hours > 0).length;
  const sum = exerciseHours.reduce((prev, curr) => prev + curr, 0);
  const average = (sum / periodLength) || 0;
  const success = average >= target;
  const rating = average >= target * 1.25 ? 3 : success ? 2 : 1;
  const ratingDescription = ratings.find(r => r.rating === rating)
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescription.description,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))