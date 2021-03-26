import { WebPlugin } from '@capacitor/core';

import type { GoogleSigninPlugin } from './definitions';

export class GoogleSigninWeb extends WebPlugin implements GoogleSigninPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
