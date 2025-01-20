import { Octokit } from '@octokit/rest';
import OpenAI from 'openai';
import core from '@actions/core';
import * as dotenv from 'dotenv';
dotenv.config();

import githubPrCodeRetriever from './github-pr-code-retriever.js';
import openaiCodeReviewGenerator from './openai-codereview-generator.js';
import githubCodeReviewPoster from './github-code-review-poster.js';

import GithubPayloadData from './payload/github-payload-data.js';

const codeReviewByOpenAI = async() => {
    console.log("CODE REVIEW BY OPEN AI");

    const repoName = core.getInput('repository-name');
    const repoOwner = core.getInput('repository-owner');
    const pullRequestNumber = core.getInput('pull-request-number');

    console.log(`REVIEWING => PULL REQUEST NAME: ${repoName}, PULL REQUEST NUMBER: ${pullRequestNumber}`);

    const githubPayloadData = new GithubPayloadData(repoOwner, repoName, pullRequestNumber);
    try {
        //get pr code from github
        //initializing octokit service for github
        const octokit = new Octokit({
          auth: core.getInput('github-api-token')
        });
        const prCodeData = await githubPrCodeRetriever(githubPayloadData, octokit);

        //get comments from openai
        //initializing openai service
         const openaiClient = new OpenAI({
                apiKey: core.getInput('open-ai-token'), // This is the default and can be omitted
              });

        const codeReviewCommentsToPost = await openaiCodeReviewGenerator(openaiClient, prCodeData);

        //post comments to github on pull request
        await githubCodeReviewPoster(codeReviewCommentsToPost, githubPayloadData, octokit);
    } catch(error) {
        console.error("Error during processing..");
        throw error;
    }
}

async function run() {
    try {
        await codeReviewByOpenAI();
    } catch(error) {
        console.log("Encountered Error::", error.name, ':', error.message);
        console.error("\nStack Trace::", error.stack);
        console.log("\nFull Error Log::", error);
    }
}

run();