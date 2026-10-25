# Validation du TP de base — 25 octobre 2026

Environnement : Windows 10 Pro 22H2, Azul Zulu JDK 25.0.5, Maven 3.9.16 fourni avec IntelliJ IDEA 2026.2.3, Payara Server Web 7.2026.8 (build 16).

Versions du projet : Jakarta EE Web API 11.0.0 (provided), PrimeFaces 16.0.1, Maven Compiler Plugin 3.16.0 (version stable) et Maven WAR Plugin 3.5.1. Versions vérifiées sur Maven Central lors de la réalisation.

## Construction et déploiement

- Construction finale depuis zéro : `clean package` avec Java 25 et compilation dans un processus javac séparé (`maven.compiler.fork=true`) — BUILD SUCCESS.
- WAR : `target/tp0-khabot-amine.war`.
- Déploiement final testé avec `deployer.ps1` — succès.
- Accueil `/tp0-khabot-amine/` — HTTP 200, formulaire JSF affiché automatiquement.
- Servlet personnalisé `/tp0-khabot-amine/hello-servlet` — HTTP 200, message de bienvenue Khabot Amine.
- Inspection du journal Payara après les tests finaux : aucune erreur grave dans l'extrait courant.

## Scénarios testés sur le vrai serveur par requêtes HTTP GET/POST

- Les expressions EL sont remplacées par du HTML.
- Sans rôle : « Vous devez indiquer le rôle de l'API ».
- Avec rôle et question composée d'espaces : « Il manque le texte de la question ».
- Première question `BONJOUR Amine` : rôle en majuscules puis question en minuscules, entourés de `||`.
- La liste des rôles devient désactivée après le premier envoi.
- Deuxième question `DEUXIEME QUESTION` : réponse exacte `||deuxieme question||`, sans répétition du rôle.
- L'historique contient les deux échanges ; la portée view conserve l'état entre les requêtes.
- Nouveau chat : question et conversation réinitialisées.
- Les ressources CSS et JavaScript sont servies par Faces avec HTTP 200.
- Interface contrôlée visuellement dans le navigateur : formulaire en deux colonnes conforme au code fourni. Une fenêtre étroite nécessite le défilement horizontal prévu par les tailles fixes du code.

Les boutons JavaScript de copie et d'effacement sont ceux de l'énoncé ; les fichiers sont servis correctement, mais les opérations du presse-papiers n'ont pas été testées. Aucun test unitaire n'est ajouté ; les scénarios ci-dessus sont des tests fonctionnels du serveur.

## Point restant pour une remise

Le dépôt Git est local, avec les commits des étapes. Aucun dépôt GitHub n'est encore lié et aucun push n'a été effectué. La coquille du service et la différence entre la description et le champ réponse sont expliquées dans README.md. Aucune demande d'accord ni aucun email n'a été envoyé à l'enseignant.
