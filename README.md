# E-handelsprojekt (Stripe Checkout)

## Innehållsförteckning
* [Installation - Instruktioner](#installation)
* [Projektbeskrivning](#beskrivning)


## 1. Installation

För att installera och köra projektet lokalt: <br>
* Klona eller forka repot
* Öppna valfri terminal

#### Server:
```
$ cd ../nextgen/server
$ npm install
$ npm run dev
```

#### Client:
```
$ cd ../nextgen/client
$ npm install
$ npm run dev
```

## 2. Beskrivning

En mindre webbapplikation (e-handel). Syftet med projektet är att skapa en modern och användarvänlig e-handelsplattform som erbjuder en god shoppingupplevelse för användaren.

Projektet inkluderar funktioner som:

- Visa en lista över produkter med bilder, namn och priser.
- Lägg produkter i en varukorg och hantera varukorgen.
- Genomföra en säker kassaprocess med betalningsintegration. <br> (Info om giltiga testkort på Stripe --> https://stripe.com/docs/testing)
- Visa orderhistorik för inloggade användare.
- Hantera användarautentisering och användarprofiler.


### Teknologier

- Frontend: React, Typescript, HTML, CSS
- Backend: Node.js, Express
- Stripe


