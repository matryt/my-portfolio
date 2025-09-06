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
  id?: string;
  partners: PersonDetails[];
  description: string;
  github: string;
  image?: string; // Optionnel car sera récupéré séparément
  displayed: boolean;
  technologies: string[];
  name: string;
  demo?: string;
  status?: Status;
  screenshots?: string[]; // Sera récupéré séparément
  whatILearned?: string;
  longDescription?: string;
  problemsAndSolutions?: string;
  projectType?: "personal" | "school";
  order?: number;
  hasImage?: boolean; // Indique si le projet a une image
  hasScreenshots?: boolean; // Indique si le projet a des screenshots
}

// Type pour les données sans images (récupérées via l'endpoint principal)
export interface ProjectData extends Omit<Project, 'image' | 'screenshots'> {
  hasImage?: boolean;
  hasScreenshots?: boolean;
}

// Type pour les réponses d'images
export interface ProjectImages {
  id: string;
  image?: string;
  screenshots?: string[];
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