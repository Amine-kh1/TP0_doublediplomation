# Comprendre le TP et le traitement choisi

Ce guide sert à relire le projet avec le cours. La mise en œuvre a bénéficié d'une assistance IA ; les tests du projet ne remplacent pas une vérification personnelle.

## Les outils et les composants

- **Jakarta EE** est un ensemble de spécifications. **Payara** les met en œuvre et exécute le WAR.
- **Maven** lit `pom.xml`, télécharge les dépendances, compile le Java, exécute les tests et construit le WAR. L'API Jakarta EE est en portée `provided`, car Payara la fournit. PrimeFaces est inclus dans le WAR.
- **Git** garde les étapes du projet avec des commits. **GitHub** héberge ces commits à distance.
- **Jakarta Faces (JSF)** construit une page HTML à partir de `index.xhtml`. Le navigateur reçoit le HTML, pas les balises `h:*` et les expressions `#{bb.question}`.
- **CDI** crée et injecte les objets. `@Inject` fournit le service à `Bb` : le backing bean n'a pas besoin de faire `new GenerateurReponse()`.

## Du navigateur à la réponse

1. Le navigateur demande `index.xhtml` avec une requête HTTP GET. JSF produit le formulaire HTML.
2. La saisie de la zone Question est liée à `#{bb.question}`. À l'envoi du formulaire par HTTP POST, JSF utilise `setQuestion()` pour mettre à jour cette propriété, si les validations précédentes réussissent.
3. Le bouton « Envoyer la question » est lié à `#{bb.envoyer}`. Cette méthode vérifie que la question n'est pas vide, puis appelle le service injecté.
4. Le service convertit les secondes. `Bb` range le résultat dans `reponse` et ajoute l'échange à `conversation`.
5. Le retour `null` conserve la vue. JSF produit le HTML avec les valeurs actualisées, puis le navigateur l'affiche.

`@Named` rend `Bb` accessible sous le nom `bb` dans la page. `@ViewScoped` garde la même instance pour les envois successifs dans la même vue. Avec `@RequestScoped`, la conversation serait perdue d'une requête à la suivante. Le service `@Dependent` suit la durée de vie de l'instance de `Bb` qui le possède. Le bouton « Nouveau chat » appelle `nouveauChat()`, qui retourne `index` pour changer de vue et retrouver un état initial.

## Calcul choisi : des secondes aux heures, minutes et secondes

La saisie représente une **durée**, pas une heure de la journée : 90061 secondes donnent 25 heures, et non 1 heure après un retour à zéro à minuit.

```java
long heures = secondes / 3600;
long minutes = (secondes % 3600) / 60;
long secondesRestantes = secondes % 60;
```

Pour `3661` :

- `/` fait une division entière : `3661 / 3600` vaut `1`.
- `%` donne le reste : `3661 % 3600` vaut `61`.
- `61 / 60` vaut `1` minute.
- `3661 % 60` vaut `1` seconde.

La réponse est donc `3661 s = 1 h 1 min 1 s`.

Le service accepte un entier positif ou nul écrit en chiffres, après retrait des espaces autour. Il refuse les nombres négatifs, les décimales et le texte. `long` permet de représenter de grandes durées ; `Long.parseLong()` lève une `NumberFormatException` si le nombre dépasse sa capacité. Le `catch` produit alors une explication au lieu de laisser remonter une erreur serveur.

Le rôle de l'API reste obligatoire dans le formulaire fourni. Sa valeur n'influence pas ce calcul : la signature du service est conservée pour ne pas changer le branchement avec le backing bean. Les erreurs de format d'une durée s'affichent dans la zone Réponse ; la question vide suit le mécanisme JSF expliqué ci-dessous.

## Les deux chemins d'erreur à distinguer

**Question vide, avec un rôle renseigné :** `question == null || question.isBlank()` dans `Bb.envoyer()` est vrai. La méthode crée un `FacesMessage` ERROR, puis `facesContext.addMessage(null, message)` l'ajoute comme message global. Le retour `null` maintient la vue sans appeler le convertisseur ni ajouter d'échange.

Dans `index.xhtml`, `h:messages` sélectionne les messages globaux avec `globalOnly="true"`, affiche le détail avec `showDetail="true"`, masque le résumé avec `showSummary="false"` et applique la couleur rouge avec `errorStyle="color: red"`. Le texte affiché est « Il manque le texte de la question ».

**Rôle absent :** `required="true"` sur `p:selectOneMenu` déclenche la validation JSF. `requiredMessage` fournit le texte et `h:message for="rolesysteme"` l'affiche. Cette validation intervient avant l'action et peut empêcher l'appel de `Bb.envoyer()`.

## Vérification personnelle dans le navigateur

Choisir un rôle, puis essayer successivement `3661`, `60`, `0`, `90061`, `-1`, `1.5` et une question vide. Vérifier la réponse, l'historique et la remise à zéro avec « Nouveau chat ». Tester séparément un rôle vide sur une nouvelle vue. Les boutons de copie et d'effacement utilisent les fonctions JavaScript fournies et doivent aussi être essayés.

Pour vérifier la compréhension, expliquer sans recopier : pourquoi `@ViewScoped` est utilisé, pourquoi le service est injecté, ce que font `/` et `%`, et quelles parties du Java **et** de la page JSF affichent le message de question vide.
