import { module, test } from 'qunit';
import { setupTest } from 'github-dealfront/tests/helpers';

module('Unit | Service | github-api', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:github-api');
    assert.ok(service);
  });
});
