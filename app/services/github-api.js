import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class GithubApiService extends Service {
  @tracked accessToken = '';

  baseUrl = 'https://api.github.com';

  constructor() {
    super(...arguments);
    this.loadStoredToken();
  }

  loadStoredToken() {
    const storedToken = localStorage.getItem('githubAccessToken');
    if (storedToken) {
      this.accessToken = storedToken;
    }
  }

  setToken(token) {
    this.accessToken = token;
    if (token) {
      localStorage.setItem('githubAccessToken', token);
    } else {
      localStorage.removeItem('githubAccessToken');
    }
  }

  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http://') || endpoint.startsWith('https://')
      ? endpoint
      : `${this.baseUrl}${endpoint}`;

    const headers = {
      ...options.headers,
      Authorization: `token ${this.accessToken}`,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error making request to ${endpoint}: ${error.message}`);
    }
  }
}
