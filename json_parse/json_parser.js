const fs = require('fs');

const rawEscapedText = fs.readFileSync('json_text.txt', 'utf8').trim();

// Remove surrounding quotes if any (often extra wrapping quotes cause issues)
const withoutQuotes = rawEscapedText.replace(/^"(.*)"$/, '$1');

// Unescape the string by parsing as JSON string
const cleanedText = JSON.parse(`"${withoutQuotes}"`);

// Now parse JSON object
const jsonObject = JSON.parse(cleanedText);

fs.writeFileSync('output.json', JSON.stringify(jsonObject, null, 4));

console.log('Cleaned JSON saved to output.json');
