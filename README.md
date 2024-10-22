```bash
npm create cloudflare@latest

npx shadcn@latest init
```

- Uncomment the AI binding in wrangler.toml
- Run `npm run cf-typegen` to generate the type definitions for the AI binding
- Add the CLOUDFLARE_ACCOUNT_ID: string; and CLOUDFLARE_API_TOKEN: string; in env.d.ts file
- Update the env.d.ts file with the correct AI binding to uppercase AI to avoid errors
- create .dev.vars file and add the CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN