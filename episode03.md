## Episode-03 | Creating our Express Server

- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /, /test and /hello
- Install nodemon and update scripts inside package.json
- What are dependencies?
  - For a project or a package, dependencies are defined in the package.json to install the versions of modules it depends on
- What is the use of "-g" while running npm install?
  - "-g" is used to install a package globally on your computer.
  - after installation, you can use that package in any directory
  - eg - `npm -g install nodemon`
- What is the .bin in node_modules?
  - The directory node_modules/.bin is where the binaries of the modules used by your project are stored, normally using symbolic links to the respective binaries in the corresponding module's directory -> https://stackoverflow.com/a/57082990
- Difference between `^` and `~` in package.json versions?
  - Caret `^` allows both minor version and patch updates while tilde `~` only allows patch updates to a package
