import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RepositoryListComponent extends Component {
  @service githubApi;

  @tracked repositories = [];
  @tracked filteredRepositories = [];
  @tracked selectedLanguage = 'All';
  @tracked showPublicRepos = true;
  @tracked showPrivateRepos = true;
  @tracked organizationName = '';

  @tracked languages = [
    'All',
    'JavaScript',
    'Python',
    'Ruby',
    'Java',
    'TypeScript',
  ];
  @action
  applyFilters() {
    if (!this.repositories || this.repositories.length === 0) {
      this.filteredRepositories = [];
      return;
    }

    this.filteredRepositories = this.repositories.filter((repo) => {
      const matchesType =
        (this.showPublicRepos && !repo.private) ||
        (this.showPrivateRepos && repo.private);

      const matchesLanguage =
        this.selectedLanguage === 'All' ||
        repo.language === this.selectedLanguage;

      return matchesType && matchesLanguage;
    });
  }

  @action
  handleLanguageChange(event) {
    this.selectedLanguage = event.target.value;
    this.applyFilters();
  }

  @action
  togglePublicRepos() {
    this.showPublicRepos = !this.showPublicRepos;
    this.applyFilters();
  }

  @action
  togglePrivateRepos() {
    this.showPrivateRepos = !this.showPrivateRepos;
    this.applyFilters();
  }

  @action
  updateOrganizationName(event) {
    this.organizationName = event.target.value;
  }

  @action
  async fetchRepositories() {
    const orgName = this.organizationName;

    if (!orgName || !this.githubApi.accessToken) {
      alert('Please enter a GitHub organization name and access token.');
      return;
    }

    try {
      const data = await this.githubApi.request(`/orgs/${orgName}/repos`);
      this.repositories = data;
      this.applyFilters();
    } catch (error) {
      alert(`Error fetching repositories: ${error.message}`);
    }
  }
}
