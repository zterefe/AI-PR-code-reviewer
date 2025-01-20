import openai from 'openai';
import Octokit from '@octokit/rest';

async function githubCodeReviewPoster(gptCommentsPerFile, githubPayloadData, octokit) {
    console.log("\nStarting to post comments to the pr");

    const commentsToPostOnPr = [];
    for (const comments of gptCommentsPerFile) {
      commentsToPostOnPr.push(
        {path: comments.filename, position: Number(comments.diffPosition), body: comments.codeReview}
      );
    }

    console.log('Posting this gpt comments to github:', commentsToPostOnPr);
    if (commentsToPostOnPr != null && commentsToPostOnPr.length > 0)
    {
        const params = {
          owner: githubPayloadData.owner,
          repo: githubPayloadData.repo,
          pull_number: githubPayloadData.pullRequestNumber,
          body: 'Please see Comment',
          event: 'COMMENT',
          comments: commentsToPostOnPr
        };

        try {
          const createReviewResponse = await octokit.pulls.createReview(params);
          console.log(createReviewResponse);
          console.log('Response status: ', createReviewResponse.status);
          if (createReviewResponse.status == 200) {
            console.log(`Finished posting code review comments with response: ${createReviewResponse}`);
          } else {
            throw new Error(`Failed to post code review comments with response: ${createReviewResponse}`);
          }
        } catch(error) {
          throw error;
        }
    }
}

export default githubCodeReviewPoster;