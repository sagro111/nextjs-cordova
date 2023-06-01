import fs from 'fs';
import path from 'path';
import {mkdirpSync} from 'mkdirp';

export async function writeFile(pathToFile, contents) {
    try {
        await mkdirpSync(path.dirname(pathToFile));
        fs.writeFileSync(pathToFile, contents);
    } catch (err) {
        console.error('writeFile', err.toString());
    }
}

export async function deleteFiles(files = []) {
    try {
        for (const file of files) {
            fs.rmSync(file);
        }
    } catch (err) {
        console.error(err.toString());
    }
}

export function checkMultipleExtensions(file, extensions = []) {
    return extensions.some((extension) => path.extname(file) === extension);
}

export async function getFilesRecursive(startPath = 'www', extensions = ['js']) {
    const files = [];

    const getFile = (newPath = startPath) => {
        fs.readdirSync(newPath).forEach((file) => {
            const filename = path.join(newPath, file);
            if (fs.lstatSync(filename).isDirectory()) {
                getFile(filename);
            } else if (checkMultipleExtensions(file, extensions)) {
                files.push(filename);
            }
        });
    };
    getFile();
    return files;
}
