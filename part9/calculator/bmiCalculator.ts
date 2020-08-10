interface bmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height:number, weight:number): string => {
  const bmi = weight/((height/100)**2);
  if (bmi < 15) {
    return('Very severely underweight');
  }
  else if (bmi < 16) {
    return('Severely underweight');
  }
  else if (bmi < 18.5) {
    return('Underweight');
  }
  else if (bmi < 25) {
    return('Normal');
  }
  else if (bmi < 30) {
    return('Overweight');
  }
  else if (bmi < 35) {
    return('Moderately obese');
  }
  else if (bmi < 40) {
    return('Severley obese');
  }
  else if (bmi > 40) {
    return('Very severley obese');
  }
  else {
    return '';
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}