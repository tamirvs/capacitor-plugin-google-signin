declare module '@capacitor/core' {
  interface PluginRegistry {
    GoogleSignIn: GoogleSignInPlugin;
  }
}

export interface GoogleSignInPlugin {
  signIn(): Promise<User | null>;
}

export interface User {
  id: string;
  email: string;
  idToken: string
}

// export interface GoogleAuth {
//   signIn(): Promise<gapi.auth2.GoogleUser>;
// }

// declare global {
//   interface Window { gapi: any; }
// }
