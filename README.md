# Dev setup

Run either `dev-unix` or `dev-win` script:

```bash
$ npm run dev-unix
```

```bash
$ npm run dev-win
```

It'll start a dev server at [localhost:5000](localhost:5000). Hot reload is enabled.

In case of an error you may need to login to your firebase account. Install firebase CLI tools and login:

```bash
$ npm install -g firebase-tools
$ firebase login
```

---
**WARNING**

Even though the commands above run a development server, they partially operate on a shared, production database.
---
