export class User {
  login: string;
  password: string;
  role: string;
  projects?: string[];
  currentProject?: string;
  tasks?: string;
  commonTasks?: string;
  messages?: string[];
  name?: string;
  surName?: string;
  lastName?: string;
  birthDate?: string;
  city?: string;
  about?: string;
  picture?: string;
  errMsg?: string;
}

