# Validation — 26 octobre 2026

Environnement : Windows 10 Pro 22H2, Azul Zulu JDK 25.0.5, Maven 3.9.16, Payara Web 7.2026.8 (build 16), Jakarta EE Web API 11.0.0 et PrimeFaces 16.0.1. Plugins Maven Compiler 3.16.0 et WAR 3.5.1. JUnit 4.13.2 est limité aux tests.

## Construction

Construction depuis zéro avec clean verify : BUILD SUCCESS. Trois tests JUnit exécutés, zéro échec, zéro erreur et aucun test ignoré. Ils couvrent les changements d'unité, zéro, les espaces autour de la saisie, les durées de plus de 24 heures, les formats invalides et les limites de long.

Le compilateur Java rencontrait un refus d'accès lors de la résolution des chemins dans le profil Windows. Les sources ont été recopiées sans modification dans C:\autresprogrammes\payara7.2026.8\verification-tp0\projet, avec un cache Maven isolé. La compilation complète et les tests ont réussi dans ce dossier autorisé. Les sources livrées sont celles de cette construction ; ce dossier ne fait pas partie du WAR.

## Déploiement et tests sur Payara

Déploiement du WAR sous /tp0-khabot-amine : succès. Le script scripts/verification-http.cjs a ensuite confirmé :

- accueil JSF accessible et expressions EL remplacées par du HTML ;
- rôle obligatoire et question vide refusée par le message global attendu ;
- aucun échange ajouté pour une question vide ;
- 3661 s = 1 h 1 min 1 s, puis 60 s = 0 h 1 min 0 s ;
- rôle figé après le premier envoi et historique des conversions conservé ;
- valeurs -1, 1.5 et bonjour refusées ;
- dépassement de long pris en charge sans erreur serveur ;
- zéro accepté après les erreurs ;
- nouveau chat : question et conversation effacées, choix du rôle réactivé ;
- ressources CSS et JavaScript accessibles avec HTTP 200.

Les boutons de copie et d'effacement JavaScript sont ceux fournis. La distribution de leurs fichiers a été vérifiée ; les opérations du presse-papiers n'ont pas été testées. Les tests de la première version du TP de base, avant remplacement du service pour le bonus, sont décrits dans les commits précédents.

## Compréhension et remise

Les vérifications ci-dessus sont automatisées. La lecture personnelle du cours, la relecture du code et les essais dans le navigateur restent à effectuer par l'étudiant avant de présenter le travail comme personnellement vérifié. Un guide de compréhension est fourni dans docs/comprendre-le-tp.md. L'aide de l'IA est indiquée dans le README. Aucun email n'a été envoyé à l'enseignant.
