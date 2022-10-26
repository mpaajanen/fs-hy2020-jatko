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
]

const calculateBmi = (heigth: number, weight: number): bmiDescription => {
  const heightInMeters: number = heigth / 100;
  const calculatedTreshold: number = (weight / (heightInMeters * heightInMeters))
  const category = bmiCategories.find(cat => cat.treshold > calculatedTreshold)
  return category.description
}

console.log(calculateBmi(180, 74));