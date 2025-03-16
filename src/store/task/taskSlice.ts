import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/taskTypes";

interface TaskState {
  activeTasks: Task[];
  completedTasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  activeTasks: [],
  completedTasks: [],
  loading: false,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTaskRequest: (state: TaskState) => {
      state.loading = true;
    },
    fetchTaskSuccess: (state: TaskState, action: PayloadAction<{ activeTasks: Task[]; completedTasks: Task[] }>) => {
      state.activeTasks = action.payload.activeTasks;
      state.completedTasks = action.payload.completedTasks;
      state.loading = false;
    },
    fetchTaskFailure: (state: TaskState) => {
      state.loading = false;
    },
    addTaskRequest: (state: TaskState, action: PayloadAction<string>) => {
      state.loading = true;
      action.payload;
    },
    MarkTaskCompleteRequest: (state: TaskState, action: PayloadAction<number>) => {
      state.loading = true;
      action.payload;
    },
    editTaskRequest: (state: TaskState, action: PayloadAction<{ id: number; title: string }>) => {
      state.loading = true;
      action.payload;
    },
    editTaskSuccess: (state: TaskState, action: PayloadAction<Task>) => {
      state.loading = false;
      state.activeTasks = state.activeTasks.map(task => task.id === action.payload.id ? action.payload : task);
    },
    editTaskFailure: (state: TaskState) => {
      state.loading = false;
    },
    addTaskuccess: (state: TaskState) => {
      state.loading = false;
    },
    addTaskFailure: (state: TaskState) => {
      state.loading = false;
    },
    deleteTaskRequest: (state: TaskState, action: PayloadAction<number>) => {
      state.loading = true;
      action.payload;
    },
    deleteTaskSuccess: (state: TaskState) => {
      state.loading = false;
    },
    deleteTaskFailure: (state: TaskState) => {
      state.loading = false;
    },
  },
});

export const {
  fetchTaskRequest,
  fetchTaskSuccess,
  fetchTaskFailure,
  addTaskRequest,
  MarkTaskCompleteRequest,
  editTaskRequest,
  editTaskSuccess,
  editTaskFailure,
  addTaskuccess,
  addTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} = taskSlice.actions;

export default taskSlice.reducer;