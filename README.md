# Filtre des menus

Liste des menus du traiteur fictif Vite & Gourmand, chargés en JSON et filtrés sans rechargement, en JavaScript.

## Lancement

Ouvrir le dossier dans VS Code, puis `index.html` avec l'extension Live Server (`http://127.0.0.1:5500`). Ouvert directement depuis le disque (`file://`), le navigateur bloque le chargement du fichier `data/menus.json`.

## Étapes

Le projet suit le cours de JavaScript de ma formation. Notation : **B** = bloc, **M** = module, **R** = ressource.

| Étape | Ressources | Notions | Tag |
|---|---|---|---|
| Chargement des menus | B3M6 (ProgJS) R3-4 | fichier JSON (données des menus), `fetch` et `response.json()` avec `async` / `await` (charger les menus, deux attentes), `for/of`, `createElement`, `textContent`, `appendChild` (afficher la liste des titres dans la page) | `etape-fetch` |
