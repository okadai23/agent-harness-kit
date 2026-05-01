# Clean Architecture Rules

- `src/domain` contains entities, value objects, and domain services.
- `src/application` contains use cases and ports.
- `src/adapters` contains inbound and outbound adapters.
- `src/infrastructure` contains framework wiring, config, DB clients, and composition roots.
- Domain code must not import application, adapters, or infrastructure.
- Application code must not import adapters or infrastructure.
- External services are accessed through ports.

Run:

```bash no-run
pnpm arch
```

