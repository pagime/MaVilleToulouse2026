# MaVilleMarseille2026 — État des lieux & Fonctionnalités

> Application civique pour les élections municipales de Marseille 2026
> Dernière mise à jour : 28 février 2026

---

## Stack technique

| Élément         | Technologie                        |
| --------------- | ---------------------------------- |
| Framework       | Vue 3 (Composition API, `<script setup>`) |
| Build           | Vite 7                             |
| CSS             | Tailwind CSS v4                    |
| State           | Pinia (persisté localStorage)      |
| Routeur         | Vue Router 4 (history mode)        |
| Graphiques      | Chart.js + vue-chartjs             |
| PWA             | vite-plugin-pwa (Workbox)          |
| Déploiement     | Cloudflare Pages (Wrangler)        |
| Police          | Inter (Google Fonts)               |

---

## Architecture du projet

```
src/
├── App.vue                    # Layout principal (navbar, footer, dark mode)
├── main.js                    # Point d'entrée
├── style.css                  # Tailwind + variables custom + animations
│
├── pages/                     # 9 pages
│   ├── Accueil.vue            # Page d'accueil
│   ├── Candidats.vue          # Liste des candidats
│   ├── Candidat.vue           # Fiche candidat individuelle
│   ├── Quiz.vue               # Quiz interactif
│   ├── Resultats.vue          # Résultats du quiz
│   ├── Comparateur.vue        # Comparateur de programmes
│   ├── FAQ.vue                # Foire aux questions
│   ├── Contact.vue            # Contact & droit de réponse
│   └── MentionsLegales.vue    # Mentions légales & méthodologie
│
├── components/                # 8 composants réutilisables
│   ├── CandidatCard.vue       # Carte candidat (photo, parti, slogan)
│   ├── ComparateurTable.vue   # Tableau comparatif des programmes
│   ├── QuizProgress.vue       # Barre de progression du quiz
│   ├── QuizQuestion.vue       # Interface de question du quiz
│   ├── ResultatChart.vue      # Graphique barres (compatibilité)
│   ├── RadarChart.vue         # Graphique radar (scores par thème)
│   ├── ReserveBanner.vue      # Bannière de réserve électorale
│   └── GlossaryText.vue       # Tooltip glossaire interactif
│
├── composables/               # 4 composables
│   ├── useDarkMode.js         # Gestion mode sombre
│   ├── useQuizScoring.js      # Algorithme de scoring
│   ├── useReserve.js          # Détection réserve électorale
│   └── useShuffle.js          # Mélange aléatoire (Fisher-Yates)
│
├── data/                      # Données JSON
│   ├── config.json            # Configuration (dates réserve, nom app)
│   ├── candidats.json         # 7 candidats + programmes complets
│   ├── quiz.json              # 20 questions + positions candidats
│   ├── thematiques.json       # 10 thématiques avec couleurs
│   ├── glossaire.json         # 48 termes avec définitions
│   └── communes.json          # Données commune (Marseille)
│
├── stores/
│   └── quiz.js                # Store Pinia (réponses, progression)
│
├── router/
│   └── index.js               # Configuration des routes
│
└── assets/                    # Images et ressources statiques
```

---

## Fonctionnalités détaillées

### 1. Quiz interactif de compatibilité politique

**Page :** `Quiz.vue` | **Store :** `quiz.js` | **Scoring :** `useQuizScoring.js`

- **20 questions** couvrant **10 thématiques** de la campagne
- Échelle de réponse à 5 positions : Tout à fait contre (-2) → Tout à fait pour (+2)
- **Curseur d'importance** (1 à 5) pour pondérer chaque question
- Possibilité de **passer une question** (non comptée dans le score)
- Navigation avant/arrière avec **transitions slide** animées
- **Sauvegarde automatique** de la progression dans localStorage
- Écran d'introduction expliquant le fonctionnement
- Réponse obligatoire avant de passer à la question suivante

**Algorithme de scoring :**
```
distance = |position_utilisateur - position_candidat|  (0 à 4)
score = (1 - distance/4) × importance
compatibilité% = Σ(scores) / Σ(importances) × 100
```

---

### 2. Page de résultats

**Page :** `Resultats.vue` | **Composants :** `ResultatChart.vue`, `RadarChart.vue`

- **Classement** des 7 candidats par % de compatibilité (tri décroissant)
- **Graphique en barres horizontales** (Chart.js) montrant la compatibilité globale
- **Graphique radar** montrant les scores par thématique pour chaque candidat
- Cartes individuelles par candidat avec :
  - Pourcentage de compatibilité
  - Parti politique
  - Principaux points d'accord et de désaccord
- Section **"Question par question"** détaillant :
  - Position de l'utilisateur vs position de chaque candidat
  - Justification de la position du candidat
  - Code couleur par thématique
- Boutons : refaire le quiz, partager l'application
- Mention de confidentialité (aucune donnée envoyée)

---

### 3. Fiches candidats

**Pages :** `Candidats.vue` (liste), `Candidat.vue` (détail) | **Composant :** `CandidatCard.vue`

**Liste des candidats :**
- Affichage des 7 candidats dans un **ordre aléatoire** (neutralité via Fisher-Yates)
- Carte avec photo (lazy loading), nom, parti, slogan
- Badge de statut source : "Programme officiel" (vert) ou "Déclarations publiques" (ambre)

**Fiche individuelle** (`/candidat/:id`) :
- En-tête : photo/initiales, nom, parti, slogan, profession
- Section biographie avec mandats précédents
- **Statistiques résumées** : nombre de propositions, couverture thématique (sur 10), mandats
- **Programme par thématique** en sections accordéon (ouvrir/fermer tout)
- Chaque proposition affiche : titre, description, coût estimé, lien source

**7 candidats configurés :**
| Candidat | Parti | Sondage |
|----------|-------|---------|
| Benoît Payan | Printemps marseillais | ~31% |
| Franck Allisio | RN/UDR/Reconquête | ~29% |
| Martine Vassal | LR/Renaissance | ~21% |
| Sébastien Delogu | LFI/Vaï Marseille | ~12% |
| Victor Hugo Espinosa | Écologie au centre | ~4% |
| Erwan Davoux | Marseille pour tous | ~2% |
| Rémy Bazzali | Lutte Ouvrière | ~1% |

---

### 4. Comparateur de programmes

**Page :** `Comparateur.vue` | **Composant :** `ComparateurTable.vue`

- Sélection de **2 à 3 candidats** pour comparaison côte à côte
- **Filtre par thématique** (dropdown)
- Affichage des propositions avec description, coût estimé, lien source
- **Responsive** : cards empilées (mobile) / colonnes côte à côte (desktop)
- Message de fallback si aucune proposition sur un thème

---

### 5. Glossaire interactif

**Composant :** `GlossaryText.vue` | **Données :** `glossaire.json`

- **48 termes** définis (PLU, RTM, HLM, taxe foncière, conseil municipal, etc.)
- Termes **surlignés en pointillé** dans les questions du quiz
- **Tooltip au clic** avec définition complète
- Seule la première occurrence de chaque terme est mise en évidence
- Tri par longueur (termes les plus longs d'abord) pour éviter les correspondances partielles

---

### 6. Réserve électorale

**Composable :** `useReserve.js` | **Composant :** `ReserveBanner.vue` | **Config :** `config.json`

- Désactivation automatique du quiz les **jours de réserve électorale** (conformément au Code électoral L49)
- Dates configurées : 14-15 mars 2026 (1er tour), 21-22 mars 2026 (2nd tour)
- **Bannière d'alerte** ambre affichée sur les pages concernées
- Le comparateur reste accessible pendant la réserve
- Rôle ARIA `alert` pour l'accessibilité

---

### 7. Mode sombre

**Composable :** `useDarkMode.js`

- **Détection automatique** de la préférence système (`prefers-color-scheme: dark`)
- Toggle dans la navbar (icône soleil/lune)
- Persistance du choix dans localStorage
- Classe `.dark` appliquée sur `<html>`
- Tous les composants adaptés au dark mode via Tailwind

---

### 8. Progressive Web App (PWA)

**Config :** `vite.config.js` (vite-plugin-pwa)

- Application **installable** sur mobile et desktop
- **Fonctionne hors ligne** grâce au Service Worker (Workbox)
- Pré-cache des fichiers JS, CSS, HTML, images, polices
- Mode d'affichage `standalone` (sans barre de navigation navigateur)
- Icône et couleur thème personnalisés

---

### 9. FAQ

**Page :** `FAQ.vue`

- **8 questions/réponses** en sections dépliables :
  1. Comment fonctionne le scoring du quiz
  2. D'où viennent les positions des candidats
  3. Neutralité politique
  4. Collecte de données (aucune)
  5. Signalement d'erreurs
  6. Quiz vs sondage (distinction juridique)
  7. Pourquoi le quiz est parfois désactivé
  8. Fréquence de mise à jour des données

---

### 10. Contact & Droit de réponse

**Page :** `Contact.vue`

- Section pour les **candidats/équipes** (droit de réponse)
- Section pour les **citoyens** (signalements, suggestions)
- Liens email avec objets pré-remplis
- Engagement de réponse sous 48h

---

### 11. Mentions légales & Méthodologie

**Page :** `MentionsLegales.vue`

- Informations éditeur
- Déclaration de non-affiliation politique
- **Explication détaillée de l'algorithme** avec formule mathématique
- Sources utilisées (programmes, déclarations, votes)
- Procédure de droit de réponse
- **RGPD** : aucun tracking, aucun cookie, aucune collecte de données
- Distinction quiz/sondage (loi 1977-2)
- Explication de la réserve électorale

---

## 10 Thématiques couvertes

| # | Thématique | Couleur |
|---|-----------|---------|
| 1 | Transport & Mobilité | 🔵 #2563EB |
| 2 | Écologie & Environnement | 🟢 #16A34A |
| 3 | Sécurité | 🔴 #DC2626 |
| 4 | Urbanisme & Logement | 🟣 #9333EA |
| 5 | Éducation & Jeunesse | 🟠 #EA580C |
| 6 | Culture & Patrimoine | 🩷 #DB2777 |
| 7 | Fiscalité locale | 🟡 #CA8A04 |
| 8 | Solidarité & Social | 🩵 #0891B2 |
| 9 | Numérique & Innovation | 🔵 #4F46E5 |
| 10 | Démocratie locale | 🟢 #059669 |

---

## Routes de l'application

| Route | Page | Description |
|-------|------|-------------|
| `/` | Accueil | Page d'accueil avec contexte et navigation |
| `/candidats` | Candidats | Liste des 7 candidats (ordre aléatoire) |
| `/candidat/:id` | Candidat | Fiche détaillée d'un candidat |
| `/quiz` | Quiz | Quiz interactif de 20 questions |
| `/quiz/resultats` | Résultats | Résultats et compatibilité |
| `/comparer` | Comparateur | Comparaison côte à côte des programmes |
| `/faq` | FAQ | Questions fréquentes |
| `/contact` | Contact | Contact et droit de réponse |
| `/mentions-legales` | Mentions légales | Légal, méthodologie, RGPD |

---

## Points forts

- **Aucune collecte de données** — tout le calcul est fait côté client
- **Neutralité** — ordre aléatoire des candidats, même traitement pour tous
- **Conformité légale** — réserve électorale automatique, distinction quiz/sondage
- **Accessibilité** — ARIA labels, gestion du focus, navigation clavier
- **Responsive** — adapté mobile, tablette et desktop
- **PWA** — installable et fonctionnel hors ligne
- **Mode sombre** — détection auto + toggle manuel
- **Glossaire intégré** — 48 termes expliqués pour l'éducation civique
- **Open source** — code transparent et vérifiable
- **Performance** — lazy loading des pages, images chargées en différé

---

## Déploiement

- **Hébergement :** Cloudflare Pages
- **Build :** `npm run build` → dossier `dist/`
- **Deploy prod :** `npm run deploy` (branche main)
- **Deploy preview :** `npm run deploy:preview`
- **SPA fallback :** `_redirects` → `/* /index.html 200`
