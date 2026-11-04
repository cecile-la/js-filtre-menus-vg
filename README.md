# Filtre des menus

Liste des menus du traiteur fictif Vite & Gourmand, chargés en JSON et filtrés sans rechargement, en JavaScript.

## Lancement

Ouvrir le dossier dans VS Code, puis `index.html` avec l'extension Live Server (`http://127.0.0.1:5500`). Ouvert directement depuis le disque (`file://`), le navigateur bloque le chargement du fichier `data/menus.json`.

## Étapes

Le projet suit le cours de JavaScript de ma formation. Notation : **B** = bloc, **M** = module, **R** = ressource.

| Étape | Ressources | Notions | Tag |
|---|---|---|---|
| Chargement des menus | B3M6 (ProgJS) R3-4 | fichier JSON (données des menus), `fetch` et `response.json()` avec `async` / `await` (charger les menus, deux attentes), `for/of`, `createElement`, `textContent`, `appendChild` (afficher la liste des titres dans la page) | `etape-fetch` |
| Filtre par prix | B3M6 (ProgJS) R6 | champ `<input type="number">` et `<label for>` (saisir le prix, relier le libellé au champ), `addEventListener` sur l'événement `input` (réagir à chaque frappe), `Number()` et `Number.isNaN()` (lire et vérifier la saisie), `filter()` avec une fonction fléchée (garder les menus sous le prix maximum), `textContent = ""` (vider la liste et le message avant chaque affichage), `.length` et `role="status"` (message annoncé quand aucun menu ne correspond) | `etape-filtre-prix` |
