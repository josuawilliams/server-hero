export type userType = {
  email: string;
  name: string;
  password: string;
  timeOfEntry?: Date;
  role: string;
};

export type authType = {
  name: string;
  accessToken: string;
  userId: string;
};
