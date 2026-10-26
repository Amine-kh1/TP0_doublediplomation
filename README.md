# TP 0 — Khabot Amine

Java 25, Jakarta EE 11, Jakarta Faces, CDI, PrimeFaces et Payara 7.

Dépôt : https://github.com/Amine-kh1/TP0_doublediplomation

## Traitement choisi pour le bonus

Convertir une durée entière en secondes en heures, minutes et secondes. Exemple : **3661 s = 1 h 1 min 1 s**. Le calcul utilise la division entière et le reste. Une durée de plus de 24 heures reste une durée : 90061 s = 25 h 1 min 1 s.

Zéro est accepté. Les valeurs négatives, décimales, non numériques ou supérieures à la capacité de long sont refusées avec un texte explicatif. Le formulaire du professeur et sa liste de rôles sont conservés ; le rôle n'intervient pas dans cette conversion.

Le traitement a été choisi par l'étudiant et implémenté avec une assistance IA. Les tests automatisés présentés ici ne signifient pas que l'étudiant a effectué une vérification personnelle ou maîtrisé le cours. Le guide [comprendre le TP](docs/comprendre-le-tp.md) permet de relire le projet avec l'énoncé.

## Ouvrir et exécuter

1. Dans IntelliJ IDEA Ultimate, File > Open : ouvrir le dossier de ce projet ou pom.xml comme projet Maven.
2. Choisir le SDK Zulu 25 et recharger Maven.
3. Dans Run > Edit Configurations, ajouter Payara Server > Local, nommer la configuration tp0-khabot-amine et choisir Payara 7.2026.8, installé dans C:\autresprogrammes\payara7.2026.8\payara7.
4. Choisir le JRE Zulu 25, puis ajouter le WAR ou WAR exploded dans Deployment avec le contexte /tp0-khabot-amine.
5. URL : http://localhost:8080/tp0-khabot-amine/.

Sans IDE : utiliser construire.ps1 puis deployer.ps1 depuis le dossier du projet. Ces scripts utilisent les installations existantes et acceptent les chemins du JDK, de Maven ou de Payara en paramètres. Le WAR est produit dans target/tp0-khabot-amine.war. Un serveur déjà démarré peut être utilisé directement.

## Code et historique

- index.xhtml et resources/ : page JSF, CSS et JavaScript fournis, conservés.
- Bb.java : backing bean @Named et @ViewScoped. Sa logique fournie est conservée ; son commentaire décrit le nouveau traitement.
- GenerateurReponse.java : service @Dependent injecté dans Bb. La logique a été remplacée pour réaliser le bonus, comme demandé dans cette section de l'énoncé.
- HelloServlet.java et index.jsp : conservés ; le servlet affiche un message personnalisé à /hello-servlet.
- web.xml : définit index.xhtml comme page d'accueil.
- Les étapes de la partie de base et leur code restent consultables dans l'historique Git. Aucun historique n'a été réécrit.

La première version du service fourni comportait une coquille : roleSystemAffiche au lieu de roleSystemeAffiche. La correction minimale de la version de base figure dans son commit ; le service d'origine est conservé dans docs/code-fourni/. La page fournie ne rend pas la réponse readonly, contrairement à sa description : elle est conservée telle quelle. Ces écarts doivent être signalés à l'enseignant ; aucun accord de sa part n'a été reçu.

## Question vide : les parties du code concernées

Dans Bb.envoyer(), question == null || question.isBlank() détecte la saisie vide. Un FacesMessage ERROR est créé avec le détail « Il manque le texte de la question ». facesContext.addMessage(null, message) en fait un message global et return null conserve la vue, sans appel du service ni ajout à la conversation.

Dans index.xhtml, h:messages affiche le message en rouge : globalOnly="true" sélectionne les messages globaux, showDetail="true" et showSummary="false" affichent le détail et errorStyle="color: red" fixe la couleur. La question n'a pas required : ce contrôle est dans le backing bean.

Le rôle a sa propre validation : required="true" et requiredMessage sur p:selectOneMenu, puis h:message for="rolesysteme". Si le rôle est absent, cette validation peut empêcher l'appel de envoyer(). Pour tester la question vide, renseigner d'abord le rôle.

## Tests

Maven : mvn clean verify. Les tests JUnit sont dans src/test/java ; JUnit est une dépendance de test, absente du WAR. Après déploiement, le test HTTP d'intégration peut être lancé avec Node : node scripts/verification-http.cjs.

Résultats et limites : [VALIDATION.md](VALIDATION.md). Aucun email n'a été envoyé automatiquement.

Énoncé : http://richard.grin.free.fr/emsi/rabat-ia/tp/tp0-jakartaee/index.html
