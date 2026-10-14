# Calculadora IMC

API em **Node.js + Express** que calcula o Índice de Massa Corporal (IMC), com uma
interface web simples que consome a API. Projeto desenvolvido no curso de
*API Development com Node.js* (Impacta) e evoluído com correções e testes automatizados.

## Como funciona

A tela envia peso e altura para a API, que calcula o IMC e devolve a classificação:

```
POST /api/imc
Content-Type: application/json

{ "peso": 70, "altura": 1.75 }
```

Resposta:

```json
{ "imc": 22.9, "classificacao": "eutrofia" }
```

Se peso ou altura estiverem faltando ou não forem números positivos, a API responde
**400 Bad Request** com uma mensagem de erro.

### Faixas de classificação

| IMC | Classificação |
|---|---|
| menor que 18,5 | magreza |
| de 18,5 a menos de 25 | eutrofia |
| de 25 a menos de 30 | sobrepeso |
| de 30 a menos de 35 | obesidade grau I |
| de 35 a menos de 40 | obesidade grau II |
| 40 ou mais | obesidade grau III |

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) 20 ou superior.

```bash
npm install
npm start
```

O servidor sobe em `http://localhost:3010`. No Windows, o navegador abre a calculadora
automaticamente.

## Testes

```bash
npm test
```

Os testes usam o test runner nativo do Node.js (`node:test`) e cobrem o cálculo, cada faixa
de classificação e os **limites entre as faixas** (por exemplo, 24,95 e 40).

## Estrutura

| Arquivo | Responsabilidade |
|---|---|
| `server.js` | Servidor Express, rota da API e validação da entrada |
| `imc.js` | Regras de negócio: cálculo e classificação do IMC |
| `imc.test.js` | Testes automatizados das regras |
| `public/` | Interface web (HTML, CSS e JavaScript) |

## O que aprendi

- Criar uma API REST com **Express** e servir uma interface estática
- Validar a entrada e responder com o **status HTTP** correto
- Encontrar e corrigir um bug de limite: com `imc <= 24.9`, um IMC de 24,95 caía em
  "sobrepeso"; a correção foi usar `imc < 25`
- Separar a **regra de negócio** do servidor para poder testá-la
- Escrever **testes automatizados** que impedem o bug de voltar
- Declarar corretamente as dependências no `package.json`

## Tecnologias

`JavaScript` `Node.js` `Express` `HTML` `CSS` `node:test`
