import Octokit from '@octokit/rest';
import core from '@actions/core';

const githubPrCodeRetriever = async(githubPayloadData, octokit) => {
    console.log("\nRetrieving pr code...");
    const prCodeData = [];

    try {
        const { data: files } = await octokit.pulls.listFiles({
              owner: githubPayloadData.owner,
              repo: githubPayloadData.repo,
              pull_number: githubPayloadData.pullRequestNumber
        });

        if (files != null) {
            for (const file of files) {
              const codingLanguage = core.getInput('coding-language');
              if(file.filename.includes(`.${codingLanguage}`) && file.patch) {
                const diffPosition = calculateDiffFileStartingPosition(file.patch);
                if (diffPosition == 0) {
                    continue;
                }
                prCodeData.push(
                {filename: file.filename, patch: file.patch, diffStartingPosition: diffPosition}
                );
              }
            }
            console.log("Finished Retrieving pr code...");
            console.log("PR Code Data:", prCodeData);
        }
    } catch(error) {
        console.error("\nFailed to retrieve pr data");
        throw error;
    }

    return prCodeData;
}

const calculateDiffFileStartingPosition = (filePatch) => {
    const firstSplit = filePatch.split("\n", 1); //format after split [ '@@ -9,15 +9,21 @@ class AppConst {' ]
    const secondSplit = firstSplit[0].split(" "); //format after split [ '@@', '-9,15', '+9,21', '@@', 'class', 'AppConst', '{' ]
    const thirdSplit = secondSplit[2].split("");  //format after split [ '+', '9', ',', '2', '1' ]

    const diffStartingPosition = thirdSplit[1];
    return diffStartingPosition;
}

export default githubPrCodeRetriever;