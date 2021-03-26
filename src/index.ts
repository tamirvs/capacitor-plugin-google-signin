import { registerPlugin } from '@capacitor/core';

import type { GoogleSigninPlugin } from './definitions';

const GoogleSignin = registerPlugin<GoogleSigninPlugin>('GoogleSignin', {
  web: () => import('./web').then(m => new m.GoogleSigninWeb()),
});

export * from './definitions';
export { GoogleSignin };
