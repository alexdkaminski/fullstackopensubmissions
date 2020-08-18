/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { Patient, NewPatient, PublicPatient, Entry, NewEntry } from '../types';

let savedPatients = [...patients];

const getPatients = (): Patient[] => {
  return savedPatients;
};

const getPublicPatients = (): PublicPatient[] => {
  return savedPatients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
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
  savedPatients = savedPatients.concat(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const entry: Entry = { ...newEntry, id: uuidv4() };
  const savedPatient = { ...patient, entries: patient.entries.concat(entry) };
  savedPatients = savedPatients.map((p) =>
    p.id === savedPatient.id ? savedPatient : p
  );
  return savedPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = savedPatients.find(p => p.id === id);
  return patient;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  findById,
  addEntry
};