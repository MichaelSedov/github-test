import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Component | repository-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it loads branches when button is clicked', async function (assert) {
    let githubApi = this.owner.lookup('service:github-api');
    githubApi.request = () => {
      return [{ name: 'main' }, { name: 'dev' }];
    };

    this.set('repo', { branches_url: '/repos/test/test/branches' });
    await render(hbs`<RepositoryItem @repo={{this.repo}} />`);

    assert.dom('.branch__item').doesNotExist();

    await click('button');
    assert.dom('.branch__item').exists({ count: 2 });
    assert.dom('.branch__item').hasText('main');
  });

  test('it toggles visibility of branches', async function (assert) {
    let githubApi = this.owner.lookup('service:github-api');
    githubApi.request = () => {
      return [{ name: 'main' }];
    };

    this.set('repo', { branches_url: '/repos/test/test/branches' });
    await render(hbs`<RepositoryItem @repo={{this.repo}} />`);

    await click('button');
    assert.dom('.branch__item').exists();

    await click('button');
    assert.dom('.branch__item').doesNotExist();
  });
});
