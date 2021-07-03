export interface GoogleSignInPlugin {
  signIn(): Promise<User | null>;
  signOut(): Promise<void>;
}

export interface User {
  id: string;
  email: string;
  idToken: string
}
