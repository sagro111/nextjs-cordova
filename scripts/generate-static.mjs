import fs from 'fs';
import {checkMultipleExtensions, getFilesRecursive} from './utils.mjs';

const rewritePathInFile = async (file) => {
    if (checkMultipleExtensions(file,['.js', '.html', '.css'])) {
        const buffer = await fs.readFileSync(file);
        const newContent = buffer.toString().replace(/\/_next\//gim, './next/');
        await fs.writeFileSync(file, newContent, { encoding: 'utf-8' });
        console.log(`Переименование файл "${file}`);
    }
};

export async function generateStatic() {
    if (fs.existsSync('www')) {
        await fs.rmSync('www', { recursive: true, force: true });
        console.log('Remove directory "www" if exist');
    }

    if (fs.existsSync('out')) {
        console.log('Rename "out" в "www"');
        await fs.cpSync('out', 'www', { recursive: true });
    }

    if (fs.existsSync('www/sw.js')) {
        console.log('Remove service worker');
        await fs.rmSync('www/sw.js', { force: true });
    }

    if (fs.existsSync('www/_next')) {
        console.log('Rename "/www/_next/" в "/www/next/"');
        await fs.cpSync('www/_next', 'www/next', {recursive: true, force:true});
        await fs.cpSync('www/next', 'www/js/next', {recursive: true, force:true});
        await fs.rmSync('www/_next', { recursive: true, force: true });
    }

    console.log('Start files renaming process');
    const files = await getFilesRecursive('www', ['.js', '.html', '.css'])
    files.forEach(rewritePathInFile);
}
