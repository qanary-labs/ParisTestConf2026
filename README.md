# ParisTestConf2026

Dépôt de démonstration pour la ParisTestConf 2026 - Comment le self-healing va révolutionner vos tests automatisés grâce à l'IA ?

## Prérequis

Avant de commencer, vérifiez que `node` et `npm` sont installés :

```bash
node -v
npm -v
```

Si une commande n'est pas reconnue, installez Node.js (npm est inclus avec Node.js).

## Installer Node.js / npm (si nécessaire)

### macOS

Option 1 (site officiel) :

1. Télécharger l'installateur LTS : <https://nodejs.org/>
2. Installer Node.js
3. Vérifier :

```bash
node -v
npm -v
```

Option 2 (Homebrew) :

```bash
brew install node
```

### Windows

1. Télécharger l'installateur LTS : <https://nodejs.org/>
2. Lancer l'installation (laisser npm activé)
3. Ouvrir un nouveau terminal (PowerShell ou CMD)
4. Vérifier :

```bash
node -v
npm -v
```

### Linux (Ubuntu / Debian)

```bash
sudo apt update
sudo apt install -y nodejs npm
```

Vérification :

```bash
node -v
npm -v
```

Note : selon votre distribution, les versions via `apt` peuvent être anciennes. Le site officiel ou `nvm` peuvent être préférables.

## Installation du projet

Placez-vous dans le dossier du projet :

```bash
cd /chemin/vers/ParisTestConf2026
```

Installez les dépendances :

```bash
npm install
```

## Installer Playwright (tests E2E)

Le projet inclut des tests end-to-end avec Playwright.

Après `npm install`, installez les navigateurs Playwright :

```bash
npx playwright install
```

Sous Linux (si des dépendances système manquent), utilisez :

```bash
npx playwright install --with-deps
```

Il ne vous reste plus qu'à installer [Playwright MCP](https://playwright.dev/docs/test-agents) (ici, avec VSCode):

```bash
npx playwright init-agents --loop=vscode
```

## Installer `nodemon` (optionnel)

`nodemon` est déjà présent en dépendance de développement du projet, donc `npm run dev` fonctionne sans installation globale.

Si vous voulez aussi l'avoir en global sur votre machine :

```bash
npm install -g nodemon
```

Vérifier :

```bash
nodemon -v
```

## Lancer le site

### Mode développement (hot reload)

Le serveur redémarre automatiquement quand vous modifiez `server.js`.

```bash
npm run dev
```

### Mode normal

```bash
npm start
```

## Lancer les tests E2E (Playwright)

### Mode headless (CI / terminal)

```bash
npm run test:e2e
```

### Mode headed (navigateur visible)

```bash
npm run test:e2e:headed
```

### Mode UI Playwright

```bash
npm run test:e2e:ui
```

Notes :

- Playwright démarre automatiquement le serveur via `npm start` (configuration `webServer`).
- Si le serveur tourne déjà sur `http://127.0.0.1:3000`, Playwright le réutilise.
- Les rapports/fichiers de test (`playwright-report/`, `test-results/`) sont ignorés par Git.

## Ouvrir le site

Dans votre navigateur, ouvrez :

```text
http://localhost:3000
```

## Connexion (login)

Utilisez les identifiants suivants :

- Nom d'utilisateur : `admin`
- Mot de passe : `password`

Après connexion, vous serez redirigé vers :

```text
http://localhost:3000/admin
```

## Notes importantes

- La session est stockée en mémoire (pour démo/dev).
- Si vous redémarrez le serveur, la session est perdue (il faut se reconnecter).
- La route `/admin` est protégée : si vous n'êtes pas connecté, vous serez renvoyé vers `/`.
- Les tests E2E couvrent le login, l'accès à `/admin` et la déconnexion.
