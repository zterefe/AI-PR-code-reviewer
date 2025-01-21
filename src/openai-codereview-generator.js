import core from '@actions/core';

const getCodeReviewFromOpenAI = async(client, codeToReview) => {
    const promptMessage = `${core.getInput('prompt-message')} ${codeToReview}`;
    const temperature = Number(core.getInput('temperature'));

    const reviewText =  await client.chat.completions.create({
      model: model,
      messages: [{"role": "system", "content": promptMessage}],
      temperature: temperature
    });

    return reviewText;
}

const sleep = async(sleepTime) => {
     return new Promise(resolve => setTimeout(resolve, sleepTime));
}

const openaiCodeReviewGenerator = async(client, prCodeData) => {
    console.log("\nStarting to generate code review...")

    const codeReviewPerFileData = [];
    console.log("Starting to iterate over prCode");

    try {
        if (prCodeData != null) {
            for (const codeForFile of prCodeData) {
                const gptCodeReviewPerFile = await getCodeReviewFromOpenAI(client, codeForFile.patch);

                if (gptCodeReviewPerFile != null && gptCodeReviewPerFile != "") {
                 codeReviewPerFileData.push(
                            {filename: codeForFile.filename, diffPosition: codeForFile.diffStartingPosition, codeReview: gptCodeReviewPerFile.choices[0].message.content}
                  );
                }

                const waitTime = 1000;
                console.log(`Sleeping for ${waitTime} before making another request`);
                await sleep(waitTime);
            }
            console.log("Finished generating code review");
            console.log("Code Review Data:", codeReviewPerFileData);
        }
    } catch(error) {
        console.error("Failed to get code review from openAI");
        throw error;
    }

    return codeReviewPerFileData;
}

export default openaiCodeReviewGenerator;