import { module, test } from 'qunit';
import { setupRenderingTest } from 'github-dealfront/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | token-manager', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TokenManager />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <TokenManager>
        template block text
      </TokenManager>
    `);

    assert.dom().hasText('template block text');
  });
});
