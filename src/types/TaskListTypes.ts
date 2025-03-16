
export interface TaskListProps {
  id: number;
  task: string;
  dateTime: string;
  markComplete: (id: number) => void;
  deleteTask: (id: number) => void;
}