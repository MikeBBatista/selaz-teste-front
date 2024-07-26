export interface User {
  id: number;
  username: string;
  email: string;
  admin: boolean;
  password: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  createDate: Date;
  endDate: Date;
  status: string;
  responsible: string;
  responsibleId: number;
}

export interface listTasks {
  tasks: Task[];
  total: number;
}