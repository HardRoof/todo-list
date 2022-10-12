class ProjectList {
  constructor(projectTitle) {
    this.projectTitle = this.capitalize(projectTitle);
  }
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export { ProjectList };
