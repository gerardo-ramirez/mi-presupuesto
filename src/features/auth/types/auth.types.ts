export type AuthUser = {
  uid: string;
  email: string;
  displayName: string | null;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  displayName: string;
};
