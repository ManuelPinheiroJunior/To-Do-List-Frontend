export const ApiConstants = {
  TODO: {
    ADD: (userId: number) => {
      return "/tasks/" + userId;
    },
    EDIT: (taskId: number) => {
      return "/tasks/Edit/" + taskId;
    },
    FIND_NOT_COMPLETED: (userId: number) => {
      return "/tasks/not-Completed/" + userId;
    },
    FIND_COMPLETED: (userId: number) => {
      return "/tasks/Completed/" + userId;
    },
    MARK_COMPLETE: (taskId: number) => {
      return "/tasks/Check/" + taskId;
    },
    DELETE: (taskId: number) => {
      return "/tasks/" + taskId;
    },
  },
  USER: {
    SIGN_UP: "/users/signUp",
    FIND_ALL: "/users",
    EDIT: (userId: number) => {
      return "/users/Edit/" + userId;
    },
    DELETE: (userId: number) => {
      return "/users/" + userId;
    },
  },
  LOGIN: "/auth/login",
};