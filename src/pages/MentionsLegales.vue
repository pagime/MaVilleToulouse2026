<script setup>
</script>

<template>
  <div class="prose prose-neutral max-w-3xl mx-auto">
    <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
      Mentions légales & Méthodologie
    </h1>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-neutral-800 mb-3">Éditeur</h2>
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 text-sm text-neutral-700 space-y-1">
        <p><strong>Nom :</strong> Pablo MENDEZ</p>
        <p><strong>Contact :</strong> pablomzpv@gmail.com</p>
        <p><strong>Hébergeur :</strong> Cloudflare Pages (Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, USA)</p>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-neutral-800 mb-3">Déclaration de non-affiliation</h2>
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 text-sm text-neutral-700">
        <p>
          MaVilleToulouse2026 est un projet citoyen indépendant. Il n'est affilié à aucun parti politique,
          aucun candidat, aucune institution publique ni aucune organisation militante.
          L'objectif est de fournir une information factuelle et neutre pour aider les citoyens
          dans leur réflexion.
        </p>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-neutral-800 mb-3">Méthodologie de l'algorithme</h2>
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 text-sm text-neutral-700 space-y-3">
        <p>
          Le quiz de compatibilité compare vos réponses avec les positions attribuées à chaque
          candidat sur une échelle de -2 (fortement contre) à +2 (fortement pour).
        </p>
        <p><strong>Calcul du score :</strong></p>
        <ol class="list-decimal list-inside space-y-2">
          <li>
            Pour chaque question à laquelle vous répondez, on calcule la distance entre votre
            position et celle du candidat (de 0 à 4 points d'écart maximum).
          </li>
          <li>
            Cette distance est pondérée par l'importance que vous avez accordée au sujet
            (de 1 à 5).
          </li>
          <li>
            Le score de compatibilité est : <code class="bg-neutral-100 px-1 rounded">(1 - distance/4) × importance</code>
          </li>
          <li>
            Le pourcentage final est la somme des scores pondérés divisée par la somme des poids,
            multiplié par 100.
          </li>
        </ol>
        <p>
          Les questions passées ne sont pas prises en compte. En cas d'égalité, les candidats
          sont affichés ex-aequo.
        </p>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-neutral-800 mb-3">Sources</h2>
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 text-sm text-neutral-700">
        <p>
          Les positions attribuées aux candidats sont basées sur leurs programmes officiels
          publiés sur leurs sites de campagne, leurs déclarations publiques (interviews, débats,
          communiqués de presse) et leurs votes antérieurs lorsqu'ils étaient en fonction.
        </p>
        <p class="mt-2">
          Chaque position est accompagnée d'un lien vers sa source. Toute demande de correction
          peut être adressée via la
          <router-link to="/contact" class="text-secondary hover:underline">page de contact</router-link>.
        </p>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-neutral-800 mb-3">Droit de réponse</h2>
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 text-sm text-neutral-700">
        <p>
          Les positions attribuées aux candidats sont basées sur leurs programmes officiels
          et déclarations publiques. Toute demande de correction sera traitée sous 48h.
        </p>
        <p class="mt-2">
          Les candidats ou leurs équipes peuvent
          <router-link to="/contact" class="text-secondary hover:underline">nous contacter</router-link>
          pour signaler une position mal attribuée, demander une correction ou fournir des
          sources complémentaires.
        </p>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-neutral-800 mb-3">Protection des données (RGPD)</h2>
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 text-sm text-neutral-700 space-y-2">
        <p>MaVilleToulouse2026 respecte votre vie privée :</p>
        <ul class="list-disc list-inside space-y-1">
          <li>Aucune donnée personnelle n'est collectée ni stockée</li>
          <li>Aucun cookie de tracking n'est utilisé</li>
          <li>Aucun outil d'analyse comportementale n'est déployé</li>
          <li>Le quiz s'exécute entièrement dans votre navigateur</li>
          <li>Aucune donnée n'est envoyée à un serveur</li>
          <li>Vos résultats ne sont ni stockés, ni agrégés, ni partagés</li>
        </ul>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-neutral-800 mb-3">Distinction quiz / sondage</h2>
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 text-sm text-neutral-700">
        <p>
          Cet outil ne constitue pas un sondage au sens de la loi du 19 juillet 1977.
          Il s'agit d'un outil d'aide à la décision individuelle. Les résultats sont
          personnels et calculés localement. Aucun résultat collectif n'est agrégé ni publié.
          Aucune statistique du type « X% des utilisateurs sont compatibles avec le candidat Y »
          n'est calculée ni affichée.
        </p>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-neutral-800 mb-3">Période de réserve</h2>
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 text-sm text-neutral-700">
        <p>
          Conformément à l'article L49 du Code électoral, le quiz de compatibilité est
          automatiquement désactivé la veille et le jour du scrutin (1er et 2nd tour).
          Le comparateur de programmes reste accessible pendant cette période.
        </p>
      </div>
    </section>
  </div>
</template>
