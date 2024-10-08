import { Employee } from "./employee";

export type Violation = {
  _id: string;
  controlNumber: string;
  employeeNumber: string;
  employeeName: string;
  department: string;
  position: string;
  deptHead: string;
  dateOfIncident: string;
  timeOfIncident: string;
  reportedBy: string;
  incidentDescription: string;
  under: string;
  violation: string;
  description: string;
  penalty: string;
  numberOfTimes: string;
  action: string;
};

export type ViolationSummary = {
  employee: Employee;
  violations: {
    data: Violation[];
    counts: number;
  };
};
