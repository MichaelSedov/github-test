import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AuthorizationComponent extends Component {
  @service errorHandler;
  @service githubApi;

  @tracked tokenInput = '';

  get isTokenStored() {
    return !!this.githubApi.accessToken;
  }

  @action
  updateTokenInput(event) {
    this.tokenInput = event.target.value;
  }

  @action
  saveToken() {
    if (!this.tokenInput) {
      this.errorHandler.setError('Please enter a valid GitHub access token.');
      return;
    }

    this.githubApi.setToken(this.tokenInput);
    this.errorHandler.clearError();
  }

  @action
  removeToken() {
    this.githubApi.setToken('');
    this.errorHandler.clearError();
  }
}
