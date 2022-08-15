# Placar Jiu-jitsu (Obs plug-in)

### Dependências
- Node 
- ws: 8.8.1

### Como usar
- Com todos os computadores na mesma rede inicie o server node com a linha de comando "node ./server/." ou "node ./server/index.js".
- Abra o placar no computador do mesário.
- Abra o Obs e adicione a fonte de mídia navegador e coloque a mídia com a fonte "browser_source.html" sobre a cena desejada.
- Para os computadores que não estão na mesma maquina que o servidor node eles devem adicionar o ip como uma variável no url como no exemplo a seguir: ".../obs/browser_source.html?ip=127.0.0.1".
- Crie uma aba de navegação no Obs com o "controller.html" de fonte para o diretório.
