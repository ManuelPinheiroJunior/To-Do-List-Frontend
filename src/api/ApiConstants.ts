export const ApiConstants = {
  TODO: {
    ADD: (userId: number) => {
      return "/task/" + userId;
    },
    FIND_NOT_COMPLETED: (userId: number) => {
      return "/task/findAllNotCompleted/" + userId;
    },
    FIND_COMPLETED: (userId: number) => {
      return "/task/findAllCompleted/" + userId;
    },
    MARK_COMPLETE: (todoId: number) => {
      return "/task/" + todoId;
    },
    DELETE: (taskId: number) => {
      return "/task/" + taskId;
    },
  },
  USER: {
    SIGN_UP: "/user/signUp",
    FIND_ALL: "/user",
    DELETE: (userId: number) => {
      return "/user/" + userId;
    },
  },
  LOGIN: "/auth/login",
};