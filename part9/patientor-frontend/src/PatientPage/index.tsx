import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { MatchParams, Entry, Diagnosis } from "../types";
import { useStateValue, updatePatient } from "../state";

const genderIcons = {
  male: "mars" as "mars",
  female: "venus" as "venus",
  other: "genderless" as "genderless",
};

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<MatchParams>();

  const patient = { ...patients[id] };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get(`${apiBaseUrl}/patients/${id}`);
        dispatch(updatePatient(patient));
        console.log('fetching patient details');
      } catch (error) {
        console.error(error.response.data);
      }
    };
    if (!patient.ssn) fetchPatient();
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <h3>{patient.name} <Icon name={genderIcons[patient.gender]} /></h3>
        <p>
          <strong>SSN:</strong> {patient.ssn}
        </p>

        <p>
          <strong>Occupation:</strong> {patient.occupation}
        </p>
        <h4>Entries</h4>
        {!patient.entries
        ? null
        :
        patient.entries.map((entry: Entry) => (
          <div key={entry.id}>
            <p>{entry.date} {entry.description}</p>
            {!entry.diagnosisCodes
            ? null
            :
              <ul>
                {entry.diagnosisCodes?.map((diagnosisCode: any) => (
                  <li key={diagnosisCode}>{diagnosisCode}</li>
                ))}
              </ul>
            }
          </div>
        ))
        }
      </Container>
    </div>
  );
};

export default PatientPage;
