# nextjs-cordova
This package help you to run nextjs application in cordova

# Requirements packages

[NextJs](https://www.npmjs.com/package/next)  
[Cordova](https://www.npmjs.com/package/cordova)

# Troubleshooting

To successfully use our package, you need to use the `next export` command, this command adds some restrictions in the form of a ban on the use of `getServerSideProps` methods, you can read [referer NextJS docs](https://nextjs.org/docs/messages/gssp-export)

# Steps required
Install cordova: (`npm -g cordova` or `yarn global add cordova`)  
Install this package (`npm install --save-dev nextjs-cordova` or `yarn add -D nextjs-cordova`)  

1. Before all you need to add `nextjs-cordova-generator` command to your package
    ```
    "scripts": {
         "export": "next build && next export",
         "build-cordova": "nextjs-cordova-generator"
         ...
     }
    ```
2. Run in your project `next export`, this command will create `out` directory
3. Run `npm run build-cordova`, this command will create `www` directory and `config.xml` file for cordova core

# Cordova core
You can get acquainted with cordova technology on the official [documentation page](https://cordova.apache.org/docs/en/latest/)

Within your application, it will be enough for you to know these commands
Add cordova platforms for project:

`cordova platform add browser`  
`cordova platform add android`  
`cordova platform add ios`

And with these commands you can run these platforms

`cordova run browser`  
`cordova run android`  
`cordova run ios`

# Tidy up
Be sure to hide the following folders from linters, tyescript, and git etc

Typescript:  
Add the following to your `.tsconfig` file:
```
"exclude": ["out", "www", "platforms"],
```
Git:  
Add the following to your `.gitignore` file:
```
**/platforms/*
**/out/*
**/www/*
```

Eslint:  
Add the following to your `.eslintignore` file:
```
**/platforms/*
**/out/*
**/www/*
config.xml
```
