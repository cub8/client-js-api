# Prosty serwer do zarządzania klientami

## Opis projektu

### Wymaga funkcjonalne

### Wymagania niefunkcjonalne

### Odbiorcy systemu

### Korzyści dla Użytkowników systemu

## Stos technologiczny
- Node
- Postgresql
- TypeScript
- Express.js
- Prisma

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