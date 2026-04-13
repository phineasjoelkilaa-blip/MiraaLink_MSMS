# Database Management & Normalization — MiraaLink MSMS

This document explains how MSMS models, manages, and maintains its relational database using Prisma, and how normalization is applied in the schema.

## 1. Purpose

This guide is intended for developers and maintainers who need to understand:

- how the MSMS database is organized
- how normalization is implemented in the Prisma schema
- how to manage schema changes and migrations
- how database operations are performed in the backend

## 2. Architecture Overview

### 2.1 Prisma ORM

MSMS uses Prisma as the database toolkit.

- Schema location: `backend/prisma/schema.prisma`
- ORM client: `@prisma/client`
- Database provider in development: `sqlite`
- Database connection configured via `DATABASE_URL` in `backend/.env`

### 2.2 Data storage model

The database is designed as a normalized relational model. Each main concept in the application is stored in its own table, and relationships are expressed through foreign keys.

The key models are:

- `User`
- `Listing`
- `Order`
- `Review`
- `Notification`
- `WalletTransaction`
- `Prediction`
- `TrainingModule`
- `TrainingCompletion`
- `AuditLog`

## 3. Normalization in the Schema

Normalization is about organizing data so that each fact is stored once and relations connect entities instead of duplicating fields.

### 3.1 First Normal Form (1NF)

Each table stores atomic values with a clearly defined primary key.

Example:

- `Listing.quantity` is a single integer value.
- `Order.totalPrice` stores the calculated total for that order.

### 3.2 Second Normal Form (2NF)

The schema avoids partial dependencies by placing data in tables where it belongs.

Example:

- `User` stores user details such as `phone`, `name`, `role`, and `location`.
- `Listing` stores item-specific details such as `grade`, `price`, `quantity`, and `description`.

### 3.3 Third Normal Form (3NF)

Data that depends on another entity is stored in a related table rather than repeated.

Examples:

- `Order` references `Listing` and `User` instead of copying listing or buyer details.
- `Review` references `Order`, `Buyer`, and `Farmer` via foreign keys.
- `Notification` references `User` and optionally `Order`.

### 3.4 Relationship examples

- One user can own many listings: `User -> Listing`
- One listing can generate many orders: `Listing -> Order`
- One order belongs to a single buyer and a single listing: `Order -> User`, `Order -> Listing`
- One review is tied to one order and two users: `Review -> Order`, `Review -> User` (buyer), `Review -> User` (farmer)
- One training module can have many completions: `TrainingModule -> TrainingCompletion`

## 4. Database Schema and Relations

The Prisma schema uses relation fields and foreign key definitions to keep the database normalized.

### 4.1 Key relations in `backend/prisma/schema.prisma`

- `Listing.farmerId` references `User.id`
- `Order.listingId` references `Listing.id`
- `Order.buyerId` references `User.id`
- `Review.orderId` references `Order.id`
- `Review.buyerId` references `User.id`
- `Review.farmerId` references `User.id`
- `TrainingCompletion.userId` references `User.id`
- `TrainingCompletion.moduleId` references `TrainingModule.id`
- `WalletTransaction.userId` references `User.id`
- `Notification.userId` references `User.id`
- `Notification.orderId` references `Order.id`
- `AuditLog.userId` references `User.id`

### 4.2 Referential integrity

The schema uses `onDelete` actions to maintain referential integrity:

- `Cascade` is used where deleting a parent should remove dependent child records, such as listings and orders.
- `SetNull` is used for audit logs to preserve history even when the associated user is removed.

### 4.3 Unique constraints and indexes

Prisma supports unique constraints that help enforce normalized design.

Examples:

- `User.phone` is unique.
- `Review.orderId` is unique so each order has at most one review.
- `Prediction` has a compound unique constraint on `[date, grade]`.
- `TrainingCompletion` has a compound unique constraint on `[userId, moduleId]`.

## 5. Database Management Workflow

### 5.1 Local development commands

From `backend/`, use these Prisma CLI commands:

- `npx prisma migrate dev` — apply migrations and update the database schema
- `npx prisma migrate status` — inspect migration state
- `npx prisma studio` — open the graphical database explorer
- `npx prisma db push` — push Prisma schema changes to the database without generating migration files
- `npx prisma migrate reset` — reset the database, reapply migrations, and seed data
- `npm run db:seed` — populate initial data if configured in `backend/prisma/seed.js`

### 5.2 Common schema update workflow

1. Edit `backend/prisma/schema.prisma`.
2. Run `npx prisma migrate dev --name <meaningful-name>`.
3. Review the generated migration under `backend/prisma/migrations/`.
4. Use `npx prisma studio` to inspect data and validate relations.
5. Commit both schema and migration files to version control.

### 5.3 Inspecting and debugging data

- Use `npx prisma studio` to visually inspect tables, relations, and row contents.
- Use the Prisma client in backend routes to query related records.
- For low-level checks, run SQL queries against the SQLite database file at `backend/prisma/dev.db`.

### 5.4 Backend integration points

The Node backend uses Prisma in route handlers such as:

- `backend/routes/orders.js`
- `backend/routes/listings.js`
- `backend/routes/payments.js`
- `backend/routes/wallet.js`
- `backend/routes/training.js`
- `backend/routes/predictive.js`

The server is initialized in `backend/server.js` with:

```js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
```

## 6. How This System Facilitates Database Management

### 6.1 Centralized schema definition

The Prisma schema is the single source of truth for database structure.

- Developers update models and relations in one place.
- Prisma translates the schema into the actual database tables.

### 6.2 Strong typing and client generation

- `npx prisma generate` builds the Prisma Client.
- Backend code gets typed model access and safe query helpers.
- This minimizes schema drift and strengthens developer confidence.

### 6.3 Relationship enforcement

- Relations are defined explicitly in the Prisma schema.
- Foreign keys and onDelete rules enforce normalized data behavior.
- This prevents orphaned or duplicated records.

### 6.4 Migration tracking

- Each schema change becomes a migration file.
- Migrations are version-controlled under `backend/prisma/migrations/`.
- This makes rollbacks and audits easier.

## 7. Normalization Benefits for MSMS

### 7.1 Reduced duplication

Each entity is stored only once.

Example:

- User details live in `User`, not repeated on every order or listing.
- Listing attributes are separate from order data.

### 7.2 Clear relationships

Normalization makes it easy to answer business questions such as:

- Which orders belong to a given farmer?
- Which notifications are tied to a specific order?
- Which training modules has a user completed?

### 7.3 Easier maintenance

Changes to a single concept are made in one place.

Example:

- Adding a new field to `Listing` requires one schema update.
- The backend can still query relations with Prisma.

## 8. When to Denormalize

The schema is intentionally normalized for correctness. Denormalization is only advisable in cases such as:

- analytics reports that require precomputed aggregates
- frequently read summary values where join cost is significant
- caching soft copies of data for performance only when consistency tradeoffs are acceptable

In MSMS, the current schema prefers normalization and uses separate tables for clear domain ownership.

## 9. Production Considerations

### 9.1 Switching databases

The schema is database-agnostic. To use PostgreSQL or MySQL in production:

1. update `DATABASE_URL` in `backend/.env`
2. run `npx prisma migrate deploy`
3. verify data with `npx prisma studio` or your production database tooling

### 9.2 Backups and migrations

- Keep migrations committed.
- Back up the database before destructive schema changes.
- Use `npx prisma migrate resolve --applied <name>` if a migration gets out of sync.

### 9.3 Audit and logging

The `AuditLog` model preserves important events without requiring user deletion.

- `userId` is optional
- `onDelete: SetNull` preserves history

## 10. Appendix: Model Summary

### User
- id, phone, name, role, location, verified, active
- relations: listings, orders, walletTransactions, notifications, reviews, auditLogs

### Listing
- id, grade, quantity, price, description, location, status
- relations: farmer, orders

### Order
- id, quantity, totalPrice, status, deliveryAddress, payment details
- relations: listing, buyer, notifications, review

### Review
- id, rating, comment
- relations: order, buyer, farmer

### Notification
- id, type, title, message, isRead
- relations: user, order

### WalletTransaction
- id, type, amount, description, reference, status, metadata
- relations: user

### TrainingModule
- id, title, description, category, content, duration, difficulty, isActive
- relations: completions

### TrainingCompletion
- id, completedAt
- relations: user, module

### Prediction
- id, date, grade, actualPrice, predictedPrice, demandVolume, confidence

### AuditLog
- id, userId, action, details

---

For a quick reference to database commands, also see `COMMANDS_REFERENCE.md` and `backend/TROUBLESHOOTING.md`.
