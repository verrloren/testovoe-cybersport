export interface LogEntry {
  id: string;
  header: string;
  status: string;
  code: string;
}

export interface Project {
  label: string;
  value: string;
  status: string;
  codeReview: string;
  recommendations: string;
  logs: LogEntry[];
}