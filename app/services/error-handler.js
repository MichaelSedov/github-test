import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ErrorHandlerService extends Service {
  @tracked errorMessage = '';

  setError(message) {
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = '';
  }
}
