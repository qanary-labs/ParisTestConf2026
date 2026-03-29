# ParisTestConf2026 — Contexte projet

Application Node.js/Express avec authentification par session et tests Playwright.

## Stack
- `server.js` : serveur Express (login/logout, session cookie, route `/admin` protégée)
- `public/` : pages HTML statiques (`index.html`, `admin.html`)
- `tests/` : tests Playwright (`auth.spec.js`)
- Credentials de test : `admin` / `password`

## Équipe d'agents

Ce projet utilise une équipe de 3 agents. Les agents sont définis dans `.claude/agents/`.

Pour démarrer l'équipe dans une nouvelle session, dis à Claude :

> "Crée l'équipe paris-test-conf et lance le developer et le qa"

Claude va alors :
1. `TeamCreate` — créer l'équipe `paris-test-conf`
2. Spawner l'agent `developer` (subagent_type: `developer`, team: `paris-test-conf`)
3. Spawner l'agent `qa` (subagent_type: `qa`, team: `paris-test-conf`)

### Rôles
- **Manager** (Claude lui-même) : discute des features, crée les tâches, délègue
- **developer** : implémente dans le code source
- **qa-ui** : tests fonctionnels — parcours utilisateur, formulaires, redirections, logique métier
- **qa-accessibility** : tests WCAG — axe-core, navigation clavier, ARIA, contrastes
- **qa-performance** : tests perf — Core Web Vitals, temps de chargement, budget ressources

### Quel agent QA appeler ?
- Après un développement fonctionnel → toujours `qa-ui` en premier
- Si la feature touche des formulaires, du HTML sémantique ou de la navigation → ajouter `qa-accessibility`
- Si la feature charge de nouvelles ressources ou ajoute des pages → ajouter `qa-performance`
- L'utilisateur peut aussi demander explicitement un audit accessibilité ou performance indépendamment

### Workflow

1. L'utilisateur décrit une fonctionnalité au Manager
2. Le Manager discute, découpe en tâches et délègue au `developer`
3. Quand le `developer` envoie un message de fin → **le Manager déclenche automatiquement les agents QA pertinents sans attendre confirmation de l'utilisateur**
4. Chaque agent QA lancé : exécute les tests, crée/répare les tests manquants ou cassés, itère jusqu'à tout ✅
5. Chaque agent QA envoie son rapport structuré au Manager
6. Le Manager synthétise et informe l'utilisateur : ce qui a été développé, résultats par type de test
