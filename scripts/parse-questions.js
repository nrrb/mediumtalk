import fs from 'fs';
import path from 'path';

const questionsMarkdownPath = path.resolve(process.cwd(), 'questions.md');
const questionsJsonPath = path.resolve(process.cwd(), 'src/questions.json');

const markdown = fs.readFileSync(questionsMarkdownPath, 'utf-8');

const lines = markdown.split('\n');

const questions = [];
let currentLevel = '';
let currentType = '';

for (const line of lines) {
    if (line.startsWith('### ')) {
        const typeMatch = line.match(/### (.*?) Questions/);
        if (typeMatch) {
            currentType = typeMatch[1];
        }
    } else if (line.startsWith('## ')) {
        const levelMatch = line.match(/## (.*?) Level/);
        if (levelMatch) {
            currentLevel = levelMatch[1];
        }
    } else if (line.startsWith('- ')) {
        if (currentLevel) {
            questions.push({
                text: line.substring(2).trim(),
                level: currentLevel,
                type: currentType
            });
        }
    }
}

fs.writeFileSync(questionsJsonPath, JSON.stringify(questions, null, 2));

console.log(`Successfully parsed ${questions.length} questions and created src/questions.json`);
