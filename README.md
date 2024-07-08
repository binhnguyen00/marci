# Human Resources Management
- Java Spring, Gradle, PostgreSQL, React Typescript project 
# Setup
### Requirements
1. JDK 21
- MacOS    : https://www.oracle.com/in/java/technologies/downloads/#jdk21-mac
- Windows  : https://www.oracle.com/in/java/technologies/downloads/#jdk21-windows
2. Gradle 8.x
- https://gradle.org/next-steps/?version=8.8&format=all
3. PostgresSQL
- MacOS    : https://sbp.enterprisedb.com/getfile.jsp?fileid=1259021
- Windows  : https://sbp.enterprisedb.com/getfile.jsp?fileid=1259105
### Clone Project
1. Generate ssh key
```
ssh-keygen -t rsa -b 4096 -C "jackjack2000.kahp@gmail.com"
```
3. Copy key from ~/.ssh/id_rsa.pub, add key to Github
4. Config the file ~/.ssh/config
```plaintext
Host github.com
    Preferredauthentications publickey
    User <your_github_user_name>
    IdentityFile ~/.ssh/id_rsa_github
```
5. To Clone
```
git clone git@github.com:binhnguyen00/marci.git
```
### Build and Deploy Project
Go to Project all-in-one scripts directory.
```plaintext
cd /server-build && ./project.sh deploy
```
**For a better understanding**, please read scripts in ```/server-build```.
### Run Project
```plaintext
cd /server-build && ./server.sh start
```
