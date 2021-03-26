export interface GoogleSigninPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
