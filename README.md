# nextjs-cordova
This package facilitates the seamless integration and execution of Next.js applications within a Cordova environment. It has been specifically designed to bridge the gap between Next.js, a popular React framework for building user interfaces, and Cordova, which allows developers to build native mobile apps using HTML, CSS, and JavaScript. With this package, you can leverage the power of both platforms, creating mobile applications with the rich, responsive user interfaces characteristic of Next.js

<div style="display: flex; align-items: center">
    <img style="margin-right: 24px;" src="https://cordova.apache.org/static/img/cordova_bot.png" width="100" title="cordova image"> 
    <img src="https://seeklogo.com/images/N/next-js-logo-7929BCD36F-seeklogo.com.png" width="200" title="cordova image">
</div>

# Requirements
Ensure you have the following packages installed:

[NextJs](https://www.npmjs.com/package/next)  
[Cordova](https://www.npmjs.com/package/cordova)

# Installation Steps

1. Install Cordova: 
   
    ```
    npm install -g cordova
    ```
    ```
    yarn global add cordova
    ```

2. Install this package:
   
    ```
    npm install --save-dev nextjs-cordova
    ```
    ```
    yarn add -D nextjs-cordova
    ```
   

3. Add nextjs-cordova-generator command to your package.json file under scripts:

   ```
   "scripts": {
        "export": "next build && next export",
        "build-cordova": "nextjs-cordova-generator",
        // other scripts...
    }
   ```

# Usage

1. Run the next export command in your project. This will create an out directory:

    ```shell
    npm run export
    ```

2. Run the build-cordova command. This will create a www directory and a config.xml file necessary for Cordova:

    ```shell
    npm run build-cordova
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

# Troubleshooting

To successfully use our package, you need to use the `next export` command, this command adds some restrictions in the form of a ban on the use of `getServerSideProps` methods, you can read [referer NextJS docs](https://nextjs.org/docs/messages/gssp-export)

<span color="red" style="color:#ff0000; background-color: #ffeff0; padding: 5px; border-radius: 3px;">Uncaught SyntaxError: Unexpected token ?</span> - solution [@babel/plugin-transform-nullish-coalescing-operator](@babel/plugin-transform-nullish-coalescing-operator)


