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
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculate = (height:number, weight:number) => {
  const bmi = weight/((height/100)**2);
  if (bmi < 15) {
    console.log('Very severely underweight');
  }
  else if (bmi < 16) {
    console.log('Severely underweight');
  }
  else if (bmi < 18.5) {
    console.log('Underweight');
  }
  else if (bmi < 25) {
    console.log('Normal');
  }
  else if (bmi < 30) {
    console.log('Overweight');
  }
  else if (bmi < 35) {
    console.log('Moderately obese');
  }
  else if (bmi < 40) {
    console.log('Severley obese');
  }
  else if (bmi > 40) {
    console.log('Very severley obese');
  }

}

try {
  const { height, weight } = parseArguments(process.argv);
  calculate(height, weight)
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}