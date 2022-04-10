# Shorts

> Short videos on _programming_... mostly.

## Built With

[Solid](https://solidjs.com)
[XState](https://xstate.js.org)
[Fauna](https://fauna.com)

## Development 

```bash
# Run frontend Vite dev server
pnpm dev
```

The `pnpm build` command will bundle the frontend assets to a `dist` folder. 

## Database

We use Fauna for the database.

All data is accessed via functions in [this folder](./fauna/functions)

When updating the data run

```bash
pnpx fauna-schema-migrate generate
```

To prepare the migration files. Then

```bash
pnpx fauna-schema-migrate apply
```

To apply those changes
