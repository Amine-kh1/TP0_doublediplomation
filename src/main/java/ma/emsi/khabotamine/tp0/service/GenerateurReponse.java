package ma.emsi.khabotamine.tp0.service; // A modifier

import jakarta.enterprise.context.Dependent;

import java.io.Serializable;

/**
 * Traitement choisi pour le bonus : convertir une durée entière en secondes
 * en heures, minutes et secondes.
 */
@Dependent // Portée CDI pour rendre la classe injectable par CDI dans les autres classes.
// Portée Dependent : l'instance sera supprimée quand la classe qui l'a injectée sera supprimée.
public class GenerateurReponse implements Serializable { // Serializable car CDI peut mettre l'instance en mémoire secondaire.
    /**
     * Convertit une durée, sans arrondi et sans limite artificielle à 24 heures.
     * @param question nombre entier de secondes, supérieur ou égal à zéro
     * @param roleSysteme paramètre conservé pour le formulaire du TP ; il ne change pas le calcul
     * @return la conversion, ou une explication si la saisie n'est pas une durée valide
     */
    public String genererReponse(String question, String roleSysteme) {
        if (question == null || !question.strip().matches("[0-9]+")) {
            return "Saisissez un nombre entier de secondes supérieur ou égal à 0 (exemple : 3661).";
        }

        long secondes;
        try {
            secondes = Long.parseLong(question.strip());
        } catch (NumberFormatException e) {
            return "La durée est trop grande : maximum " + Long.MAX_VALUE + " secondes.";
        }

        long heures = secondes / 3600;
        long minutes = (secondes % 3600) / 60;
        long secondesRestantes = secondes % 60;

        return secondes + " s = " + heures + " h " + minutes + " min " + secondesRestantes + " s";
    }
}

