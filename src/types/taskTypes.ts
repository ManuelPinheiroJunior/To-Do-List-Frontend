export interface Task {
  id: number;
  title: string;
  date: string;
}

export interface TaskState {
  activeTodos: Task[];
  completedTodos: Task[];
  loading: boolean;
}

export interface AddTaskPayload {
  title: string;
}

export interface DeleteTaskPayload {
  id: number;
}