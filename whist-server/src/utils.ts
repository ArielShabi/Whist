import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import config from './config';

const tryParseJson = str => {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.log(`Failed to parse ${str} error: ${e}`)
        return undefined;
    }
};

const getRandomName = () => {
    let name;

    do {
        name = uniqueNamesGenerator({ dictionaries: [adjectives, animals], length: 2, separator: '', style: 'capital' });
    } while (name.length > config.maxLengthRandomName);

    return name;
};

export {
    tryParseJson,
    getRandomName
}
