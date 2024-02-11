#!/bin/bash

# Define a porta em que o servidor vai escutar
PORT=3000

# Inicia um loop infinito
while true; do
  # Usa netcat para escutar na porta especificada e retorna a entrada para o processamento
  echo -e "HTTP/1.1 200 OK\n\n $(date)" | nc -l -p $PORT | while read line; do
    echo "$line" # Imprime o que for recebido na entrada
    # Se a linha estiver vazia, isso significa que o cabeçalho HTTP terminou
    if [ -z "$line" ]; then
      exit 0
    fi
  done
done
