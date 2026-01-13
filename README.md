# Prosty serwer do zarządzania klientami

## Opis projektu

### Krótki opis

Jest to aplikacja serwerowa służąca do zarządzania klientami oraz ich integracjami. W projekcie jest też przygotowany prosty frontend, który wykorzystuje API serwera.

### Wymagania funkcjonalne

1. Odbiorca systemu może utworzyć klientów i zarządzać nimi.
2. Odbiorca systemu może pobrać listę klientów i ich filtrować.
3. Odbiorca systemu może zmienić status klienta.
4. Odbiorca systemu może stworzyć integrację dla klienta

### Wymagania niefunkcjonalne

1. Łatwo dodać nowe pola do klientów oraz integracji.
2. Serwer jest szybki i oczekiwanie na odpowiedź trwa nie dłużej niż 2 sekundy.

### Odbiorcy systemu

1. Dostawcy usług którzy chcą mieć system do zarządzania swoimi klientami, a którzy nie chcą sami go sobie tworzyć.
2. Osoby udostępniające swoje systemy online, które chcą prowadzić statystyki ile osób korzysta z ich systemów

### Korzyści dla Użytkowników systemu

1. Brak potrzeby tworzenia samemu systemu do przechowywania klientów.
2. Przeniesienie kompetencji przechowywania danych wrażliwych do zewnętrznego serwisu.

## Stos technologicznyIntegrations
- Node
- Postgresql
- TypeScript
- Express.js
- Prisma
- Alpine.js (do prostych widoków)

## Jak uruchomić projekt

Wymagania wstępne:
- node
- postgresql

### Instalacja paczek

```bash
$ npm i
```

### Konfiguracja Prisma

Upewnij się, że faktycznie migracja zadziała:

```bash
$ npx prisma db pull
```

Następnie wygeneruj klienta Prisma:
```bash
$ npx prisma generate
```
****