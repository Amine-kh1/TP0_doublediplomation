# TP 0 — Khabot Amine

Application du TP de base : Java 25, Jakarta EE 11, Jakarta Faces, CDI et PrimeFaces. Aucune partie bonus ni connexion à un LLM n'a été ajoutée.

## Ouvrir dans IntelliJ

1. File > Open : sélectionner ce dossier ou son fichier `pom.xml`, puis ouvrir comme projet Maven.
2. Dans Project Structure > Project, choisir le SDK **Zulu 25**. Recharger le projet Maven.
3. Dans Run > Edit Configurations, ajouter **Payara Server > Local**, nommer la configuration **tp0-khabot-amine** et sélectionner **Payara 7.2026.8**. Son dossier est `C:\autresprogrammes\payara7.2026.8\payara7`.
4. Choisir le JRE **Zulu 25**, ajouter l'artifact WAR ou WAR exploded dans Deployment et choisir le contexte `/tp0-khabot-amine`.
5. URL de lancement : `http://localhost:8080/tp0-khabot-amine/`.

L'application a déjà été déployée et testée sur Payara. Si le serveur fonctionne déjà, utiliser sa page directement ou l'arrêter avant de laisser IntelliJ le démarrer.

## Construire et déployer sans l'IDE

Dans un terminal PowerShell ouvert dans ce dossier :

```powershell
.\construire.ps1
.\deployer.ps1
```

Ces scripts utilisent les installations existantes de Java, Maven fourni avec IntelliJ et Payara. `deployer.ps1` démarre le domaine si nécessaire et ne remplace que l'application `tp0-khabot-amine`.

Avec Maven disponible dans le PATH : `mvn clean package`. Le WAR se trouve dans `target/tp0-khabot-amine.war`. Les dépendances Jakarta EE sont fournies par Payara ; PrimeFaces est inclus dans le WAR.

## Fichiers à comprendre

- `src/main/webapp/index.xhtml` : formulaire JSF fourni, liste de rôles PrimeFaces, question, réponse et historique.
- `src/main/java/ma/emsi/khabotamine/tp0/jsf/Bb.java` : état de la conversation en portée `@ViewScoped`, validation, appel du service injecté et remise à zéro.
- `src/main/java/ma/emsi/khabotamine/tp0/service/GenerateurReponse.java` : service `@Dependent`, question en minuscules entourée de `||`, rôle en majuscules seulement à la première réponse.
- `src/main/webapp/resources/` : CSS et JavaScript fournis.
- `src/main/webapp/WEB-INF/web.xml` : accueil sur `index.xhtml`.
- `HelloServlet.java` et `index.jsp` sont conservés comme demandé. Le servlet affiche un message personnalisé et reste accessible à `/hello-servlet`.

## Pourquoi une question vide affiche une erreur

Dans `Bb.envoyer()`, `question == null || question.isBlank()` détecte une question absente, vide ou composée d'espaces. La méthode crée un `FacesMessage` de sévérité ERROR, avec le détail « Il manque le texte de la question », puis l'ajoute au contexte Faces avec `facesContext.addMessage(null, message)`. Le `null` en fait un message global. Le retour `null` maintient la même vue.

Dans `index.xhtml`, `h:messages` affiche ce message global en rouge. `globalOnly="true"` sélectionne les messages globaux ; `showDetail="true"` et `showSummary="false"` affichent le détail plutôt que « Texte question vide ». La question n'a pas d'attribut `required` : sa validation est faite dans le backing bean.

Le rôle suit un autre chemin : `required="true"` et `requiredMessage` sur `p:selectOneMenu`, puis `h:message for="rolesysteme"` affichent son erreur. Si le rôle est manquant, cette validation peut empêcher l'appel de `envoyer()` ; tester la question vide avec un rôle renseigné.

## Écart à signaler à l'enseignant

Le service fourni déclare `roleSystemeAffiche`, mais affecte `this.roleSystemAffiche = true`, variable inexistante. Pour compiler, une seule correction de nom a été faite : `this.roleSystemeAffiche = true`. Les versions originales sont conservées sous `docs/code-fourni/`. Les seules autres adaptations de ces classes concernent les packages et l'import pour inclure le nom de l'étudiant, comme demandé.

La page JSF, le CSS et le JavaScript fournis sont conservés. L'énoncé décrit une réponse en lecture seule, mais son code ne met pas `readonly="true"` sur ce champ : le code fourni est conservé, sans changement fonctionnel supplémentaire. Demander l'accord de l'enseignant pour la correction de coquille avant une remise soumise à cette règle.

## Vérifications effectuées

Voir `VALIDATION.md` pour les résultats. Les commits suivent les étapes réelles de construction. Dépôt GitHub du projet : https://github.com/Amine-kh1/TP0_doublediplomation. Aucun email n'a été envoyé à l'enseignant.

Le dépôt origin est déjà configuré. Pour envoyer de futurs commits :

```text
git push -u origin master
```

Le répertoire `target/` est ignoré par Git. Ne pas transmettre de token dans le code ou dans un email.

Énoncé : http://richard.grin.free.fr/emsi/rabat-ia/tp/tp0-jakartaee/index.html
