/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { Patient, NewPatient, PublicPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation,
    entries
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {

  const newPatient = {
    id: uuidv4(),
    ...patient,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  findById
};