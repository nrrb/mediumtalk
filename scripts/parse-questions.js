import fs from 'fs';
import path from 'path';

const questionsMarkdownPath = path.resolve(process.cwd(), 'questions.md');
const questionsJsonPath = path.resolve(process.cwd(), 'src/questions.json');

const picnicQuestionsMarkdownPath = path.resolve(process.cwd(), 'picnic-questions.md');
const picnicQuestionsJsonPath = path.resolve(process.cwd(), 'src/picnic-questions.json');

const questionsMarkdown = fs.readFileSync(questionsMarkdownPath, 'utf-8');
const picnicQuestionsMarkdown = fs.readFileSync(picnicQuestionsMarkdownPath, 'utf-8');

const questionsLines = questionsMarkdown.split('\n');
const picnicQuestionsLines = picnicQuestionsMarkdown.split('\n');

const questions = [];
let currentLevel = '';

for (const line of questionsLines) {
    if (line.startsWith('## ')) {
        const levelMatch = line.match(/## (.*?) Level/);
        if (levelMatch) {
            currentLevel = levelMatch[1];
        }
    } else if (line.startsWith('- ')) {
        if (currentLevel) {
            questions.push({
                text: line.substring(2).trim(),
                level: currentLevel
            });
        }
    }
}

fs.writeFileSync(questionsJsonPath, JSON.stringify(questions, null, 2));

console.log(`Successfully parsed ${questions.length} questions and created ${questionsJsonPath}`);

const picnicQuestions = [];
let currentType = '';
let currentExplanation = '';

for (const [index, line] of picnicQuestionsLines.entries()) {
    if (line.startsWith('## ')) {
        const typeMatch = line.match(/## (.*)/);
        if (typeMatch) {
            currentType = typeMatch[1];
            // explanation is on the next line after a blank line
            currentExplanation = picnicQuestionsLines[index + 2];
        }
    } else if (line.startsWith('- ')) {
        if (currentType) {
            picnicQuestions.push({
                type: currentType,
                explanation: currentExplanation,
                question: line.substring(2).trim()
            });
        }
    }
}

fs.writeFileSync(picnicQuestionsJsonPath, JSON.stringify(picnicQuestions, null, 2));

console.log(`Successfully parsed ${picnicQuestions.length} picnic questions and created ${picnicQuestionsJsonPath}`);
