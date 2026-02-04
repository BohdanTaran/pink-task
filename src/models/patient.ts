export interface Patient {
  id: string;
  resourceType: "Patient";
  name?: {
    given?: string[];
    family?: string;
  }[];
  gender?: "male" | "female" | "other" | "unknown";
  birthDate?: string;
  address?: {
    line?: string[];
    city?: string;
    state?: string;
    postalCode?: string;
  }[];
}

export interface PatientBundle {
  entry?: {
    resource: Patient;
  }[];
}
