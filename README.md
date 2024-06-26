# Human Resources Management
- Java Spring, Gradle, PostgreSQL, React Typescript project 
# Setup
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
Go to Project directory. Then follow these steps
1. Build core 
```plaintext
cd /core
```
```plaintext
gradle clean build publishToMavenLocal
```
2. Build Hr application
```plaintext
cd /hr
```
```plaintext
gradle clean build publishToMavenLocal
```
3. Release Hr application <br/>
*currently standing in hr directory*
```plaintext
gradle release
```
### Run Project
```plaintext
cd /server-build && ./server.sh start
```