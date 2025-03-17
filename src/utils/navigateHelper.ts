import { NavigateFunction } from "react-router-dom";

let globalNavigate: NavigateFunction | null = null;

export const setNavigate = (navigate: NavigateFunction) => {
  globalNavigate = navigate;
};

export const redirectTo = (path: string) => {
  console.log("🚀 ~ redirectTo ~ path:", path)
  if (globalNavigate) {
    globalNavigate(path);
  } else {
    console.warn("🚨 Navigate function is not available!");
  }
};
