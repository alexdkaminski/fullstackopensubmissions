import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container, Icon, Card, Button } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { MatchParams, NewEntry, EntryType, Patient } from "../types";
import { useStateValue, updatePatient, } from "../state";
import EntryDetails from './EntryDetails';
import AddEntryModal from "../AddEntryModal";

const genderIcons = {
  male: "mars" as "mars",
  female: "venus" as "venus",
  other: "genderless" as "genderless",
};

const PatientPage: React.FC = () => {        
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<MatchParams>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);

  const patient = { ...patients[id] };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get(`${apiBaseUrl}/patients/${id}`);
        dispatch(updatePatient(patient));
        console.log('fetching patient details');
      } catch (error) {
        console.error(error);
      }
    };
    if (!patient.ssn) fetchPatient();
  }, [dispatch]);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!patient) return null;

  const submitNewEntry = async (values: NewEntry) => {
    const body = { ...values };

    if (body.type === EntryType.OccupationalHealthcare) {
      if (!body.sickLeave?.endDate && !body.sickLeave?.startDate) {
        body.sickLeave = undefined;
      }
    }

    try {
      const { data: returnedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        body
      );
      dispatch(updatePatient(returnedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data);

      let errorMessage = "Oops! Something went wrong!";

      if (e.response?.status >= 400 && e.response?.status < 500) {
        errorMessage = e.response.data.error;
      }

      setError(errorMessage);
    }
  };

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

        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        />
        <Button onClick={openModal}>Add New Entry</Button>

        {patient.entries.length > 0 && <h2>Entries</h2>}
        
        <Card.Group>
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
        </Card.Group>
      </Container>
    </div>
  );
};

export default PatientPage;
