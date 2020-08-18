/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {  
  Diagnosis,
  NewPatient,
  Gender,
  EntryType,
  HealthCheckRating,
  SickLeave,
  Discharge,
  NewBaseEntry,
  NewEntry
} from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parseString = (param: any, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing' + paramName + ": " + param );
  }
  return param;
};

const parseEntryType = (entryType: any): EntryType => {
  if (!Object.values(EntryType).includes(entryType)) {
    throw new Error('Incorrect or missing type:' + entryType );
  }
  return entryType;
};

export const assertNever = (value: never): never => {
  throw new Error(
    'Unhandled discriminated union member:' + JSON.stringify(value)
  );
};

const isArrayOfStrings = (param: any[]): param is string[] => {
  const hasNonString = param.some((item) => {
    return !isString(item);
  });

  return !hasNonString;
};

const parseDiagnosesCodes = (diagnosisCodes: any): Array<Diagnosis["code"]> => {
  if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnoses");
  }

  return diagnosisCodes;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (
    healthCheckRating === null ||
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      'Incorrect or missing health check rating:' + healthCheckRating
    );
  }
  return healthCheckRating;
};


const parseSickLeave = (object: any): SickLeave => {
  if (!object) throw new Error("Missing sick leave");

  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
};

const parseDischarge = (object: any): Discharge => {
  if (!object) throw new Error("Missing discharge");

  return {
    date: parseDate(object.date),
    criteria: parseString(object.criteria, "discharge criteria"),
  };
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseEntryType(object.type),
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

export const toNewEntry = (object: any): NewEntry => {
  const newBaseEntry = toNewBaseEntry(object) as NewEntry;

  switch (newBaseEntry.type) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case EntryType.OccupationalHealthcare:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseString(object.employerName, "employer name"),
      };

      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }

      return newEntry;
    case EntryType.Hospital:
      return { ...newBaseEntry, discharge: parseDischarge(object.discharge) };
    default:
      return assertNever(newBaseEntry);
  }
};