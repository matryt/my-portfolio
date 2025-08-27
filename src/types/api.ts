export interface PersonDetails {
  username: string;
  name: string;
  githubUrl: string;
}

export type Status =
  | 'in-progress'
  | 'completed'
  | 'paused'
  | 'cancelled';

export interface Project {
  partners: PersonDetails[];
  description: string;
  github: string;
  image: string;
  displayed: boolean;
  technologies: string[];
  name: string;
  demo?: string;
  status?: Status;
  screenshots?: string[];
  whatILearned?: string;
  longDescription?: string;
  problemsAndSolutions?: string;
  projectType?: "personal" | "school";
}

export interface EducationItem {
  start?: number;
  end?: number;
  description: string;
  order?: number;
  school: string;
}

export interface JobItem {
  start?: number;
  end?: number;
  description: string;
  order?: number;
  company: string;
  title: string;
  companyUrl?: string;
}