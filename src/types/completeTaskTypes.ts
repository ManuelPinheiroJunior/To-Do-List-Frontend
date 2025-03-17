
export interface CompleteTaskProps {
  id: number;
  task: string;
  dateTime: string;
  deleteTodo: (id: number) => void;
}