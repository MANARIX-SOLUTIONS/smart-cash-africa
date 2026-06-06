# SmartCash Africa — Mobile

> **Status: Planned** — This folder is reserved for the native mobile application. No implementation yet.

## Purpose

A Flutter mobile client for SmartCash Africa, giving users on-the-go access to budgets, transactions, savings goals, and the AI financial advisor.

## Target platform

- **Framework**: Flutter
- **State management**: Bloc / Cubit (team standard)
- **Models**: Freezed + JSON serialization
- **Backend**: `smartcashafrica-be` (when available)
- **Optional**: Firebase (Auth, Firestore, Analytics) per product requirements

## Planned feature parity

Align with the web app (`smartcashafrica-fe`) core flows:

| Area         | Mobile screens                     |
| ------------ | ---------------------------------- |
| Auth         | Login, signup, forgot password     |
| Onboarding   | Connect accounts, set goals        |
| Dashboard    | Overview, quick actions            |
| Accounts     | List, detail, connect provider     |
| Transactions | List, detail, quick add            |
| Budgets      | Categories, limits, alerts         |
| Savings      | Goals, contributions               |
| Health       | Wellness score                     |
| Advisor      | AI coaching chat                   |
| Settings     | Profile, security, language, theme |

## Project setup (when started)

Typical bootstrap:

```bash
flutter create smartcashafrica_mb .
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
flutter run
```

Add `pubspec.yaml`, flavor config, and environment files when the app is created.

## Design

Reuse brand tokens from the web projects:

| Token   | Value     |
| ------- | --------- |
| Primary | `#00A86B` |
| Navy    | `#0F172A` |
| Accent  | `#2563EB` |

Support **French**, **English**, and **Wolof** to match the web app.

## Related docs

- [Monorepo overview](../README.md)
- [Architecture](../docs/ARCHITECTURE.md)
- [Web app](../smartcashafrica-fe/README.md)
- [Backend](../smartcashafrica-be/README.md)
