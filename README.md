# marci
Human Resources Management

# Setup
## Clone project
1. Generate ssh key: ssh-keygen -t rsa -b 4096 -C "jackjack2000.kahp@gmail.com"
2. Copy key from ~/.ssh/id_rsa.pub, add key to Github
3. Config the file ~/.ssh/config
    Host github.com
        Preferredauthentications publickey
        User <your_github_user_name>
        IdentityFile ~/.ssh/<your_id_rsa_file_name>
4. git clone git@github.com:binhnguyen00/marci.git
