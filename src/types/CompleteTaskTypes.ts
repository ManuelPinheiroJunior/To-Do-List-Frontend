
export interface CompeleteTaskProps {
  id: number;
  task: string;
  dateTime: string;
  deleteTodo: (id: number) => void;
}