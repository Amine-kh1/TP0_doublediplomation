package ma.emsi.khabotamine.tp0;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'><title>TP 0 de Khabot Amine</title></head><body>");
        out.println("<h1>Bienvenue dans le TP 0 de Khabot Amine !</h1>");
        out.println("<p>Java 25 et Jakarta EE 11 fonctionnent sur Payara.</p>");
        out.println("</body></html>");
    }
}
