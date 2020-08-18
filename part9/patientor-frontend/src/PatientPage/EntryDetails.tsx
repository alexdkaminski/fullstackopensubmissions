import React from "react";

import { Entry, EntryType } from "../types";
import { assertNever } from "../utils";

import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntry entry={entry} />;
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;