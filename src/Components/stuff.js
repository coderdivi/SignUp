import { google, Auth } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';

import f from 'fs';
import { env } from '../../env';

const createDirectoryIfNotExists = (directoryPath: string) => {
  if (!f.existsSync(directoryPath)) {
    f.mkdirSync(directoryPath);
    console.log(`Directory created: ${directoryPath}`);
  } else {
    console.log(`Directory already exists: ${directoryPath}`);
  }
};
const directoryPath = path.join(env('HOME'), '.g-oauth-config');

createDirectoryIfNotExists(directoryPath);

type GApiOptions = {
  CLIENT_ID?: string;
  CLIENT_SECRET?: string;
  REDIRECT_URL?: string;
  SCOPES?: string[];
};

type GCredentials = {
  web: {
    client_id: string;
    client_secret: string;
    redirect_uris: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    javascript_origins: string[];
  };
  installed: null;
};
type GToken = {
  type: string;
  client_id: string;
  client_secret: string;
  access_token: string;
  refresh_token: string;
};

class GApi {
  private clientId = '';

  private clientSecret = '';

  redirectUrl = '';

  oauth2Client: Auth.OAuth2Client;

  accessToken: string | undefined | null = '';

  refreshToken: string | undefined | null = '';

  // generate a url that asks permissions for Google Calendar SCOPES
  // If modifying these SCOPES, delete token.json.
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  private TOKEN_PATH = path.join(directoryPath, 'g-token.json');

  private CREDENTIALS_PATH = path.join(directoryPath, 'g-credentials.json');

  private SCOPES = ['https://www.googleapis.com/auth/calendar'];

  constructor({ CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, SCOPES }: GApiOptions) {
    if (SCOPES && SCOPES[0]) this.SCOPES = SCOPES;
    if (CLIENT_ID) this.clientId = CLIENT_ID;
    if (CLIENT_SECRET) this.clientSecret = CLIENT_SECRET;
    if (REDIRECT_URL) this.redirectUrl = REDIRECT_URL;
    this.oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectUrl
    );
  }

  async createCredentialsFile() {
    const payload = JSON.stringify({
      web: {
        client_id: env('G_CLIENT_ID'),
        client_secret: env('G_CLIENT_SECRET'),
        redirect_uris: ['http://localhost2023/api/g-oauth2/callback'],
        project_id: 'enduring-coil-370910',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
          'https://www.googleapis.com/oauth2/v1/certs',
        javascript_origins: ['http://localhost:2023'],
      },
    });
    await fs.writeFile(this.CREDENTIALS_PATH, payload);
  }

  /**
   * Reads previously authorized credentials from the save file.
   *
   * @return {Promise<OAuth2Client|null>}
   */
  async loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(this.TOKEN_PATH, { encoding: 'utf8' });
      const credentials = JSON.parse(content) as GToken;
      return google.auth.fromJSON(credentials) as Auth.OAuth2Client;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
   *
   * @param {OAuth2Client} client
   * @return {Promise<void>}
   */
  async saveCredentials(client: Auth.OAuth2Client) {
    const content = await fs.readFile(this.CREDENTIALS_PATH, {
      encoding: 'utf-8',
    });
    const keys = JSON.parse(content) as GCredentials;
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      access_token: client.credentials.access_token,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(this.TOKEN_PATH, payload);
  }

  generateAuthUrl(SCOPES?: string[]) {
    if (SCOPES && SCOPES[0]) this.SCOPES = SCOPES;
    const url =
      this.oauth2Client &&
      this.oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
        scope: this.SCOPES,
      });
    return url;
  }

  async getToken(code: string) {
    // This will provide an object with the access_token and refresh_token.
    // Save these somewhere safe so they can be used at a later time.
    const credSet = await this.setCreds();
    if (!credSet) {
      const tokenResponse = await this.oauth2Client.getToken(code);
      if (tokenResponse) {
        this.oauth2Client.setCredentials(tokenResponse.tokens);
      }
      this.accessToken = this.oauth2Client.credentials.access_token;
      this.refreshToken = this.oauth2Client.credentials.refresh_token;
      // console.log('saving creds ...\n', this.oauth2Client);
      await this.createCredentialsFile();
      await this.saveCredentials(this.oauth2Client);
    }

    return this.oauth2Client.credentials.access_token;
  }

  async setCreds() {
    const client = await this.loadSavedCredentialsIfExist();
    if (client) {
      this.oauth2Client = client;
      this.accessToken = this.oauth2Client.credentials.access_token;
      this.refreshToken = this.oauth2Client.credentials.refresh_token;
      return true;
    }
    return false;
  }
}

export const gApi = new GApi({
  CLIENT_ID: env('G_CLIENT_ID'),
  CLIENT_SECRET: env('G_CLIENT_SECRET'),
  REDIRECT_URL: env('G_REDIRECT_URL'),
});