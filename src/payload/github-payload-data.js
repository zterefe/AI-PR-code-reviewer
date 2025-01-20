class GithubPayloadData {
    constructor(owner, repo, pullRequestNumber) {
        this.owner = owner;
        this.repo = repo;
        this.pullRequestNumber = pullRequestNumber;
    }
}

export default GithubPayloadData;