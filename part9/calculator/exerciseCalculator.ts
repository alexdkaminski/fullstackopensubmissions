export {};

interface InputValues {
  dailyHours: number[];
  targetDailyHours: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: Array<string>): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[3]))) {
    const dailyHours = args[2].substr(1,args[2].length-2).split(',').map(x=>+x);
    console.log(dailyHours)
    if (dailyHours.every((element) => {return !isNaN(element)})) {
      return {
        dailyHours: dailyHours,
        targetDailyHours: Number(args[3])
      }
    } else {
      throw new Error('All elements in the array must be numbers'); 
    }
  } else {
    throw new Error('Target value is not a number!'); 
  }
}

const calculateExercises = (dailyHours: number[], targetDailyHours: number): Result => {

  const calculateTrainingDays = (dailyHours: number[]): number => {
    return dailyHours.filter(d => d > 0).length
  }

  const trainingDays = calculateTrainingDays(dailyHours);

  const calculateAverage = (dailyHours: number[]): number => {
    const sum = (total: number, num: number) => {
      return total + num
    }
    return dailyHours.reduce(sum, 0) / dailyHours.length;
  }

  const average = calculateAverage(dailyHours);

  const calculateRating = (average: number, target: number) : number => {
    if (average >= target) {
      return 3
    } else if (target - average <= 2) {
      return 2
    } else {
      return 1
    }
  }

  const rating = calculateRating(average, targetDailyHours);

  const ratingDescription = (rating: number): string => {
    if (rating === 3) {
      return 'an excellent effort'
    } else if (rating === 2) {
      return 'close but you need to try harder'
    } else {
      return 'get it together'
    }
  }

  return {
    periodLength: dailyHours.length,
    trainingDays: trainingDays,
    success: average >= targetDailyHours ? true : false,
    rating: rating,
    ratingDescription: ratingDescription(rating),
    target: targetDailyHours,
    average: average,
  }
}

try {
  const { dailyHours, targetDailyHours } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, targetDailyHours));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}