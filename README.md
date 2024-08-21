# Human Resources Management
### Technical Stack
- Java Spring, Gradle, PostgreSQL
- React Typescript, Webpack
# Setup
### Requirements
1. My Library (Java Spring & React libs)
- Clone my library
```plaintext
https://github.com/binhnguyen00/core
```
- Where to place?
```plaintext
The tree structure should be identicaly like this for the scripts and other code to work:
root
|__ core
|__ marci
|__ |__ hr
```
2. JDK 21
- MacOS    : https://www.oracle.com/in/java/technologies/downloads/#jdk21-mac
- Windows  : https://www.oracle.com/in/java/technologies/downloads/#jdk21-windows
3. Gradle 8.x
- Download : https://gradle.org/next-steps/?version=8.8&format=all
4. PostgresSQL
- MacOS    : https://sbp.enterprisedb.com/getfile.jsp?fileid=1259021
- Windows  : https://sbp.enterprisedb.com/getfile.jsp?fileid=1259105
5. NodeJS
- Download : https://nodejs.org/en/download/package-manager
- After finished, Please install pnpm. I **strongly recommend**.
  ```plaintext
  npm install -g pnpm
  ```
### Compile and Deploy Project
```plaintext
cd /server-build && ./project.sh deploy
```
💡 **For a better understanding**, please read scripts in ```/server-build```. Starting with ```project.sh```.
### Run Project
- Start Server
  ```plaintext
  cd /server-build && ./server.sh start
  ```
- Start UI
  ```plaintext
  cd /server-build && ./server.sh start-ui
  ```
- Show helps
  ```plaintext
  cd /server-build && ./server.sh
  ```
💡 **For a better understanding**, please read scripts in ```/server-build```. Starting with ```server.sh```.
