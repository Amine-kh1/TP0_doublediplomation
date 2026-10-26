package ma.emsi.khabotamine.tp0.service;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class GenerateurReponseTest {
    private final GenerateurReponse service = new GenerateurReponse();

    @Test
    public void convertirLesDureesEtLesChangementsDUnite() {
        assertEquals("0 s = 0 h 0 min 0 s", service.genererReponse("0", null));
        assertEquals("59 s = 0 h 0 min 59 s", service.genererReponse("59", null));
        assertEquals("60 s = 0 h 1 min 0 s", service.genererReponse("60", null));
        assertEquals("3599 s = 0 h 59 min 59 s", service.genererReponse("3599", null));
        assertEquals("3600 s = 1 h 0 min 0 s", service.genererReponse("3600", null));
        assertEquals("3661 s = 1 h 1 min 1 s", service.genererReponse(" 3661 ", "Assistant"));
        assertEquals("90061 s = 25 h 1 min 1 s", service.genererReponse("90061", null));
    }

    @Test
    public void refuserLesSaisiesQuiNeSontPasDesEntiersPositifsOuNuls() {
        for (String saisie : new String[]{null, "", "   ", "-1", "1.5", "bonjour"}) {
            assertTrue(service.genererReponse(saisie, null).startsWith("Saisissez un nombre entier"));
        }
    }

    @Test
    public void gererLaLimiteDeLongSansDebordement() {
        assertEquals("9223372036854775807 s = 2562047788015215 h 30 min 7 s",
                service.genererReponse("9223372036854775807", null));
        assertTrue(service.genererReponse("9223372036854775808", null)
                .startsWith("La durée est trop grande"));
    }
}
