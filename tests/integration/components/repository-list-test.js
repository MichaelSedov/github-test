import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, settled } from '@ember/test-helpers';
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

class GithubApiStub extends Service {
  async request() {
    return [
      { name: 'repo1', language: 'JavaScript', private: false },
      { name: 'repo2', language: 'Python', private: true }
    ];
  }
}

module('Component | repository-list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:error-handler', ErrorHandlerStub);

    this.owner.register('service:github-api', GithubApiStub);
  });

  test('it renders with filters, input and fetch button', async function(assert) {
    await render(hbs`<RepositoryList />`);

    assert.dom('input#orgName').exists('Organization name input is rendered');
    assert.dom('button').hasText('Fetch Repositories', 'Fetch button is rendered');

    assert.dom('select#language').exists('Language filter is rendered');
    assert.dom('input[type="checkbox"]').exists({ count: 2 }, 'Public/Private filters are rendered');
  });

  test('it shows an error if no organization name is provided', async function(assert) {
    let errorHandler = this.owner.lookup('service:error-handler');
    await render(hbs`<RepositoryList />`);

    await click('button');
    await settled();

    assert.equal(errorHandler.errorMessage, 'Please enter a valid GitHub organization name.', 'Error message is set in the ErrorHandler');
  });
});
