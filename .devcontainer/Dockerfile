FROM mcr.microsoft.com/devcontainers/typescript-node:0-20

USER node
RUN npm install -g typescript && \
    sudo apt update && sudo apt install && \
    sudo apt install apt-transport-https && \
    wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/dart.gpg && \
    echo 'deb [signed-by=/usr/share/keyrings/dart.gpg arch=amd64] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main' | \
    sudo tee /etc/apt/sources.list.d/dart_stable.list && \
    sudo apt update && sudo apt install dart && \
    export PATH="$PATH:/usr/lib/dart/bin" && \
    echo 'export PATH="$PATH:/usr/lib/dart/bin"' >> ~/.profile

RUN sudo wget https://go.dev/dl/go1.21.6.linux-amd64.tar.gz -O /tmp/golang.tar.gz && \
    sudo tar -C /usr/local -xzf /tmp/golang.tar.gz && \
    export PATH="$PATH:/usr/local/go/bin" && \
    echo 'export PATH="$PATH:/usr/local/go/bin"' >> ~/.profile
