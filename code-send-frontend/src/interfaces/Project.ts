import { Api } from "./Api";

export interface Project extends Api {
  name: string;
}

export interface ProjectFormValues extends Omit<Project, keyof Api> {}
