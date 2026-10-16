# Calculadora IMC

Calculadora de Índice de Massa Corporal (IMC) em duas versões que compartilham a mesma
regra de negócio, testada:

- **Web:** API em **Node.js + Express** com uma interface web que consome a API.
- **Desktop:** aplicativo para Windows, Mac e Linux feito com **Electron**.

Projeto desenvolvido no curso de *API Development com Node.js* (Impacta) e evoluído com
correções, testes automatizados e uma arquitetura com a regra de negócio compartilhada.

## Download

Quer só usar a calculadora no Windows, sem instalar Node.js?
Baixe o instalador na página da [versão mais recente](https://github.com/thomaaasr/calculadora-imc/releases/latest)
(arquivo `Calculadora.IMC.Setup.1.0.0.exe`, em *Assets*).

## Arquitetura

```
           imc.js  ← regra de negócio (cálculo + classificação), coberta por testes
          ↗      ↖
   server.js      desktop/main.js
 (API Express)    (processo principal do Electron)
       ↑                  ↑ IPC
  public/ (navegador)   desktop/ (janela do app)
```

Uma correção na regra vale para as duas versões, e os testes protegem as duas.

## Versão web

A tela envia peso e altura para a API, que calcula o IMC e devolve a classificação:

```
POST /api/imc
Content-Type: application/json

{ "peso": 70, "altura": 1.75 }
```

Resposta:

```json
{ "imc": 22.86, "classificacao": "eutrofia" }
```

Se peso ou altura estiverem faltando ou não forem números positivos, a API responde
**400 Bad Request** com uma mensagem de erro.

Para rodar (pré-requisito: [Node.js](https://nodejs.org) 20 ou superior):

```bash
npm install
npm start
```

O servidor sobe em `http://localhost:3010`. No Windows, o navegador abre a calculadora
automaticamente.

## Versão desktop (Electron)

A janela do aplicativo não calcula sozinha: ela pede o cálculo ao processo principal por
**IPC** (comunicação entre processos). Um *preload* (`desktop/preload.js`) expõe para a tela
apenas a função `calcular`, sem dar a ela acesso ao Node.js ou ao computador.

```bash
cd desktop
npm install
npm start
```

## Faixas de classificação

| IMC | Classificação |
|---|---|
| menor que 18,5 | magreza |
| de 18,5 a menos de 25 | eutrofia |
| de 25 a menos de 30 | sobrepeso |
| de 30 a menos de 35 | obesidade grau I |
| de 35 a menos de 40 | obesidade grau II |
| 40 ou mais | obesidade grau III |

O IMC é exibido com duas casas decimais, para que o valor mostrado seja o mesmo usado na
classificação (um IMC de 24,95 aparece como 24,95 e é classificado como eutrofia).

## Testes

```bash
npm test
```

Os testes usam o test runner nativo do Node.js (`node:test`) e cobrem o cálculo, cada faixa
de classificação e os **limites entre as faixas** (por exemplo, 24,95 e 40).

## Estrutura

| Arquivo | Responsabilidade |
|---|---|
| `imc.js` | Regras de negócio: cálculo e classificação do IMC |
| `imc.test.js` | Testes automatizados das regras |
| `server.js` | Servidor Express, rota da API e validação da entrada |
| `public/` | Interface web (HTML, CSS e JavaScript) |
| `desktop/main.js` | Processo principal do Electron: cria a janela e responde aos pedidos de cálculo |
| `desktop/preload.js` | Ponte segura entre a janela e o processo principal |
| `desktop/renderer.js` | Lógica da janela: lê o formulário e mostra o resultado |

## O que aprendi

- Criar uma API REST com **Express** e servir uma interface estática
- Validar a entrada e responder com o **status HTTP** correto
- Encontrar e corrigir um bug de limite: com `imc <= 24.9`, um IMC de 24,95 caía em
  "sobrepeso"; a correção foi usar `imc < 25`
- Separar a **regra de negócio** para reaproveitá-la em duas interfaces e testá-la
- Escrever **testes automatizados** que impedem o bug de voltar
- Criar um app de desktop com **Electron**: processo principal, preload, IPC e `async/await`
- Perceber que dois tipos de arredondamento (`toFixed` e `Math.round`) podem divergir
- Declarar corretamente as dependências no `package.json`

## Tecnologias

`JavaScript` `Node.js` `Express` `Electron` `HTML` `CSS` `node:test`
