# Human Resources Management
### Technical Stack
- Java Spring, Gradle, PostgreSQL
- React Typescript, Webpack
# Setup
### Requirements
1. JDK 21
- MacOS    : https://www.oracle.com/in/java/technologies/downloads/#jdk21-mac
- Windows  : https://www.oracle.com/in/java/technologies/downloads/#jdk21-windows
2. Gradle 8.x
- Download : https://gradle.org/next-steps/?version=8.8&format=all
3. PostgresSQL
- MacOS    : https://sbp.enterprisedb.com/getfile.jsp?fileid=1259021
- Windows  : https://sbp.enterprisedb.com/getfile.jsp?fileid=1259105
4. NodeJS
- Download : https://nodejs.org/en/download/package-manager
- After finished, Please install pnpm. I **strongly recommend**.
  ```plaintext
  npm install -g pnpm
  ```
### Build and Deploy Project
```plaintext
cd /server-build && ./project deploy -clean
```
**For a better understanding**, please read scripts in ```/server-build```. Starting with ```project.sh```.
### Run Project
```plaintext
cd /server-build && ./server.sh start
```
**For a better understanding**, please read scripts in ```/server-build```. Starting with ```server.sh```.
