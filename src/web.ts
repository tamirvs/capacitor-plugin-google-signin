import { WebPlugin } from '@capacitor/core';
import { GoogleSignInPlugin, User } from './definitions';

let loadGauthPromise: any;

export class GoogleSignInWeb extends WebPlugin implements GoogleSignInPlugin {
  private gauth?: gapi.auth2.GoogleAuth;

  constructor() {
    super({
      name: 'GoogleSignIn',
      platforms: ['web'],
    });
    
    // this.loadGauth();
  }

  private async loadGauth() {
    if (!loadGauthPromise) {
      loadGauthPromise = new Promise(resolve => {
        const elem = document.createElement('script');
        elem.src = 'https://apis.google.com/js/platform.js';
        elem.async = true;
        elem.defer = true;
        elem.onload = resolve;
        document.head.appendChild(elem);
      }).then(() => {
        return new Promise<void>(resolve => {
          gapi.load('auth2', () => {
            gapi.auth2.init({
              client_id: process.env.APP_GAUTH_CLIENT_ID,
              scope: 'profile',
              ux_mode: 'popup'
            }).then(() => {
              this.gauth = gapi.auth2.getAuthInstance();
              resolve();
            });
          });
        });
      });
    }

    return loadGauthPromise;
  }

  async signIn(): Promise<User> {
    await this.loadGauth();
    if (!this.gauth) throw null;

    const googleUser = await this.gauth?.signIn();

    const profile = googleUser.getBasicProfile();
    const user = {} as User;

    user.id = profile.getId();
    user.email = profile.getEmail();

    const auth = googleUser.getAuthResponse();
    user.idToken = auth.id_token;

    return user;
  }
}

import { registerPlugin } from '@capacitor/core';

const GoogleSignIn = registerPlugin('GoogleSignIn', {
  web: new GoogleSignInWeb()
});

export { GoogleSignIn };
