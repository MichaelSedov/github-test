import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

class ErrorHandlerStub extends Service {
  errorMessage = '';

  setError(message) {
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = '';
  }
}

module('Component | error-message', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:error-handler', ErrorHandlerStub);
  });

  test('it renders and does not show message if there is no error', async function(assert) {
    await render(hbs`<ErrorMessage />`);

    assert.dom('.error-message').doesNotExist('No error message is displayed when there is no error');
  });

  test('it shows the error message when errorHandler has an error', async function(assert) {
    let errorHandler = this.owner.lookup('service:error-handler');
    
    errorHandler.setError('Test error message');

    await render(hbs`<ErrorMessage />`);

    assert.dom('.error-message').exists('Error message container is displayed');
    assert.dom('.error-message p').hasText('Test error message', 'Correct error message is displayed');
  });
});

