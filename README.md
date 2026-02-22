# MaVilleToulouse2026 — Toulouse

Application web citoyenne pour les élections municipales 2026 à Toulouse. Permet aux citoyens de s'informer sur les candidats, comparer leurs programmes et découvrir via un quiz interactif avec quel programme ils sont le plus compatibles.

## Installation

```bash
npm install
npm run dev
```

## Stack technique

- **Vue.js 3** (Composition API, `<script setup>`)
- **Vue Router** — navigation SPA
- **Pinia** — gestion d'état du quiz
- **TailwindCSS** — styling utility-first
- **Chart.js + vue-chartjs** — visualisations (radar, bar charts)
- **Vite** — build

## Structure du projet

```
src/
├── components/       # Composants réutilisables
├── composables/      # Logique réutilisable (scoring, shuffle, réserve)
├── data/             # Données JSON statiques
├── pages/            # Pages/vues de l'application
├── router/           # Configuration des routes
├── stores/           # Stores Pinia
├── App.vue           # Composant racine
└── main.js           # Point d'entrée
```

## Données

Toutes les données sont dans `src/data/` :

- `communes.json` — communes couvertes
- `candidats.json` — candidats et leurs propositions
- `thematiques.json` — les 10 thématiques
- `quiz.json` — 20 questions avec positions des candidats
- `config.json` — dates de réserve électorale

### Contribuer aux données

Pour ajouter ou corriger des données de candidats :

1. Modifier le fichier JSON concerné dans `src/data/`
2. Respecter le format existant (voir les fichiers pour exemple)
3. Chaque position de candidat doit être sourcée (`source_url`)
4. L'échelle de position va de -2 (fortement contre) à +2 (fortement pour)

## Garde-fous juridiques

- **Neutralité** : ordre d'affichage aléatoire, traitement égal
- **Réserve électorale** : quiz désactivé automatiquement les jours de scrutin
- **Pas un sondage** : aucune agrégation de résultats
- **RGPD** : aucune donnée collectée, tout côté client
- **Droit de réponse** : page contact pour les candidats

## Déploiement

```bash
npm run build
```

Le dossier `dist/` est prêt pour un hébergement statique (Netlify, Vercel, GitHub Pages).

## Licence

Projet citoyen indépendant.
