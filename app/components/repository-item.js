import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RepositoryItemComponent extends Component {
  @service githubApi;

  @tracked branches = [];
  @tracked branchesCount = null;
  @tracked isLoadingBranches = false;
  @tracked isBranchesVisible = false;

  @action
  async fetchBranches() {
    if (this.branches.length > 0) {
      this.isBranchesVisible = !this.isBranchesVisible;
      return;
    }

    if (this.isLoadingBranches) {
      return;
    }

    this.isLoadingBranches = true;

    try {
      const data = await this.githubApi.request(
        this.args.repo.branches_url.replace('{/branch}', ''),
      );

      this.branches = data;
      this.branchesCount = data.length;
      this.isBranchesVisible = true;
    } catch (error) {
      console.error(
        `Error fetching branches for ${this.args.repo.name}:`,
        error,
      );
    } finally {
      this.isLoadingBranches = false;
    }
  }
}
