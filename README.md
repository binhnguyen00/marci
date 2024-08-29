<h1 align="center"> Human Resources Management </h1>

# Technical Stack
- Java Spring, Gradle, PostgreSQL
- React Typescript, Webpack, NodeJS

# Setup

## Requirements

### 1. My Library (Java Spring & React libs)
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
### 2. JDK 21
- MacOS    : https://www.oracle.com/in/java/technologies/downloads/#jdk21-mac
- Windows  : https://www.oracle.com/in/java/technologies/downloads/#jdk21-windows
### 3. Gradle 8.x
- Download : https://gradle.org/next-steps/?version=8.8&format=all
### 4. PostgresSQL
- MacOS    : https://sbp.enterprisedb.com/getfile.jsp?fileid=1259021
- Windows  : https://sbp.enterprisedb.com/getfile.jsp?fileid=1259105
### 5. NodeJS
- Download : https://nodejs.org/en/download/package-manager
- After finished, Please install pnpm. I **strongly recommend**.

  ```plaintext
  npm install -g pnpm
  ```

## Compile and Deploy Project
```plaintext
cd /server-build && ./project.sh deploy
```
💡 **For a better understanding**, please read scripts in ```/server-build```. Starting with ```project.sh```.

## Run Project

### 1. Start Server
- Before starting, you need to init database & user. Base on ```application.yaml```, it demands database 'marcidb' & user 'marci' (You can change that later).
  ```plaintext
  cd server-build && ./database.sh initial
  ```
  
- If the script got error, you can manually create user & database. Then run the script.
  ```
  CREATE USER marci WITH PASSWORD 'marci@123';
  CREATE DATABASE marcidb;
  ```

- Then start the server with sample data
  ```plaintext
  cd /server-build && ./server.sh start
  ```

- 💡 **Note**, ```./database.sh``` script is running on my machine env. You should change both ```application.yaml``` and ```./common/database-env.sh``` to match your env

### 2. Start UI
  ```plaintext
  cd /server-build && ./server.sh start-ui
  ```

### 3. Show helps
  ```plaintext
  cd /server-build && ./server.sh
  ```
💡 **For a better understanding**, please read scripts in ```/server-build```. Starting with ```server.sh```.
