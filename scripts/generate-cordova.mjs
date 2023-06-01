import fs from 'fs';
import {getFilesRecursive, writeFile} from './utils.mjs';

const regExpInHref = /href=\"\.\/next.*?js\"/g;
const regExpInSrc = /src=\"\.\/next.*?js\"/g;
const sourceMapStringRegExp = /\/\/# sourceMappingURL.*/g;

async function generateCordovaConfigFile() {
    if(fs.existsSync('config.xml')) {
        return
    }
    try {

        const configFile = fs.readFileSync('./node_modules/nextjs-cordova/templates/config.xml').toString();
        await writeFile('config.xml', configFile);
        console.log('Have been added config.xml!');
    } catch (err) {
        console.error(err.toString());
        throw err;
    }
}

async function generateJsFile() {
    const files = await getFilesRecursive('www/next', ['.js']);
    let jsDump = '';

    files.forEach((path) => {
        jsDump += `${fs.readFileSync(path).toString().replace(sourceMapStringRegExp, '')};\n`
    }, '');
    try {
        const cordovaJsFile = fs.readFileSync('./node_modules/nextjs-cordova/templates/index.js').toString().split('___NEXT_JS___')

        await writeFile('www/js/index.js', [cordovaJsFile[0], jsDump,cordovaJsFile[1]].join('') );
        console.log('The main js file saved');
    } catch (err) {
        console.error(err.toString());
        throw err
    }
}

async function generateHtmlFiles() {
    const injectedScripts = `
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
    `;
    try {
        const files = await getFilesRecursive('www', ['.html']);
        const htmlFiles = files.map((path) => ({
            path,
            html: fs.readFileSync(path),
        }));

        console.log('====== Preparing all html files \n====== Adding meta tags and main js bundle');
        for (const file of htmlFiles) {
            let nextHtml = file.html
                .toString()
                .replace(regExpInHref, '')
                .replace(regExpInSrc, '')
                .replace('</body>', injectedScripts + '</body>');

            await writeFile(file.path, nextHtml);
        }
    } catch (err) {
        console.error(err.toString());
        throw err
    }
}

export async function generateCordova() {
    await generateJsFile();
    await generateHtmlFiles();
    await generateCordovaConfigFile();
}
