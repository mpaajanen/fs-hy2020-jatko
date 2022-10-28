interface BmiValues {
  height: number,
  weigth: number
}

type bmiDescription = string;

const bmiCategories = [
  { description: 'Underweight (Severe thinness)', treshold: 0.0 },
  { description: 'Underweight (Moderate thinness)', treshold: 16.0 },
  { description: 'Underweight (Mild thinness)', treshold: 17.0 },
  { description: 'Underweight', treshold: 18.5 },
  { description: 'Normal range', treshold: 25.0 },
  { description: 'Overweight (Pre-obese)', treshold: 30.0 },
  { description: 'Obese (Class I)', treshold: 35.0 },
  { description: 'Obese (Class II)', treshold: 40.0 },
  { description: 'Obese (Class III)', treshold: 999.0 },
];

const parseBmiArgs = (args: Array<string>): BmiValues => {
if (args.length < 4) throw new Error('Not enough arguments.');
  if (args.length > 4) throw new Error('Too many arguments.');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weigth: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }

};

const calculateBmi = (heigth: number, weight: number): bmiDescription => {
  const heightInMeters: number = heigth / 100;
  const calculatedTreshold: number = (weight / (heightInMeters * heightInMeters));
  const category = bmiCategories.find(cat => cat.treshold > calculatedTreshold) || { description: 'Category not found.', treshold: 0 };
  return category.description;
};

try {
  const { height, weigth } = parseBmiArgs(process.argv);
  // console.log(calculateBmi(180, 74));
  console.log(calculateBmi(height, weigth));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;