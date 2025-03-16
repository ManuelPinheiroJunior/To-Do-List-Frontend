import jwt_decode, { JwtPayload } from "jwt-decode";

interface UserInfo extends JwtPayload {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const getLoginInfo = (): UserInfo | null => {
  const token = localStorage.getItem("token");
  if (token) {
    const userInfo = jwt_decode<UserInfo>(token);
    return userInfo;
  }
  return null;
};
