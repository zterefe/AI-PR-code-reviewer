# AI-PR-code-reviewer
OpenAI based peer code reviewer for your pull requests(merge requests)

[![Example Workflow](https://github.com/zterefe/code-reviwer-tester/actions/workflows/ai-code-reviewer.yml/badge.svg?branch=task-1-test)](https://github.com/zterefe/code-reviwer-tester/actions/workflows/ai-code-reviewer.yml)

This action is designed for individuals working on personal projects who need peer reviews for pull requests or for those interested in automating code review processes. The workflow pulls all changes from a single pull request and uses OpenAI's API to review the code. After completing the review, the workflow posts OpenAI's comments directly on the pull request.

To access pull request files and communicate with OpenAI, you must provide the necessary tokens. Please refer to the [Recommended permissions](#Recommended-permissions) section for details on the required token permissions.

# What's new

Please refer to the [release page](https://github.com/zterefe/AI-PR-code-reviewer/releases/latest) for the latest release notes.

# Usage

<!-- start usage -->
```yaml
- uses: zterefe/AI-PR-code-reviewer@task-1-remove-descri
  with:
    # Repository name. For example, AI-PR-code-reviewer
    #
    # Default: ${{ github.event.repository.name }}
    repository-name: ''

    # The user name for the owner of the repository. For example, zterefe
    #
    # Default: ${{ github.repository_owner }}
    repository-owner: ''

    # The number assigned to the pull request at the time of creating the pull request(Github does that automtically)
    #
    # Default: ${{ github.event.pull_request.number }}
    pull-request-number: ''

    # Used for authentication against Github APIs for getting pull request changes and posting review comments
    # Learn more about it here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens 
    github-api-token: ''

    # Used to filter out unnecessary files that are part of the pull requests to avoid sending them for code review. Example value, Java
    coding-language: ''

    # Used for authentication against OpenAI APIs for getting requesting code review.
    # Learn more about it here: https://platform.openai.com/docs/api-reference/introduction
    open-ai-token: ''

    # Type of model used for content generation in this case, code review.
    # Learn more about it here: https://platform.openai.com/docs/models
    #
    # Default: gpt-3.5-turbo-1106
    gpt-model: ''

    # Used by GPTs to control the randonmneess of generated text.
    # A higer temperature leads to more diverse and potentially surprising responses, 
    # A lower temperature results in more consistent and predictable outputs.
    # Learn more about it here: https://www.linkedin.com/pulse/decoding-gpts-temperature-setting-gaurav-shivhare- 
    # ldqoe#:~:text=The%20temperature%20can%20range%20is,instead%20explores%20more%20varied%20options.
    #
    # Default: 0.2
    temperature: ''

    # A message used for asking the GPT model to generate code review for a given file.
    # For example, "Can you review this pull request for a Java-based codebase? 
    # Please check the code for quality, ensuring it follows Java best practices like proper naming 
    # conventions, use of design patterns, and readability. Analyze the logic and functionality to 
    # verify it implements the intended features without errors. Evaluate whether the code adheres 
    # to the project's style and standards, including proper indentation, comments, and formatting. 
    # Check if the code has sufficient test coverage, including unit tests for edge cases, and 
    # mention any tests that might be missing. Also, review the performance and efficiency of the 
    # implementation"?
    prompt-message: ''
```
<!-- end usage -->

# Recommended permissions

When using the `AI-PR-Code-reviewer` action in your GitHub Actions workflow, it is recommended to set the following `GITHUB_API_TOKEN` and `OPEN-AI-TOKEN` permissions to ensure proper functionality.
 ## Github Fine-Grained tokens(Recommended)
```yaml
permissions:
  pull-requests: read and write
```
 ## Github API classic tokens
 ```yaml
permissions:
  repo: check all or limit with 'public repo'
```
 ## Open AI API
```yaml
permissions:
  model-capabilities: read and write
``` 
# License
