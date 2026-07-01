
function genererTableauDepuisJson(urlJson) {
    $.getJSON(urlJson, function(donnees) {
        if (!donnees || donnees.length === 0) {
            LogMessage("Le JSON est vide ou invalide.");
            return;
        }

        var colonnes = Object.keys(donnees[0]);
        
        var htmlLigneEntete = "";
        $.each(colonnes, function(index, cle) {
            htmlLigneEntete = htmlLigneEntete + "<th>" + cle + "</th>";
        });
        var htmlThead = "<thead><tr>" + htmlLigneEntete + "</tr></thead>";

        var htmlLignesCorps = "";
        $.each(donnees, function(index, element) {
            var htmlCellules = "";
            $.each(colonnes, function(i, cle) {
                var valeur = element[cle] !== null ? element[cle] : "";
                
                if (typeof valeur === "string") {
                    // 1. On sépare le texte à chaque retour à la ligne
                    var lignes = valeur.split("\n");
                    
                    // 2. On nettoie les espaces inutiles au début et à la fin de chaque ligne
                    var lignesNettoyees = [];
                    $.each(lignes, function(idx, ligne) {
                        // .trim() retire les espaces classiques et les espaces insécables normaux
                        var lignePropre = ligne.trim();
                        
                        // Si la ligne n'est pas complètement vide, on la garde
                        if (lignePropre !== "") {
                            lignesNettoyees.push(lignePropre);
                        }
                    });
                    
                    // 3. On rassemble les lignes propres en les séparant par un <br>
                    valeur = lignesNettoyees.join("<hr>");
                }
                
                htmlCellules = htmlCellules + "<td>" + valeur + "</td>";
            });
            htmlLignesCorps = htmlLignesCorps + "<tr>" + htmlCellules + "</tr>";
        });
        var htmlTbody = "<tbody>" + htmlLignesCorps + "</tbody>";

        var htmlTableComplete = "<table>" + htmlThead + htmlTbody + "</table>";

        $("#mon-conteneur-table").html(htmlTableComplete);
        
        LogMessage("Tableau HTML généré avec nettoyage des espaces et retours à la ligne.");
    }).fail(function() {
        LogMessage("Erreur lors de la récupération du JSON.");
    });
}


function genererTableauDepuisJsonOld(urlJson) {
    // On utilise $.getJSON pour récupérer les données de l'API / du fichier
    $.getJSON(urlJson, function(donnees) {
        if (!donnees || donnees.length === 0) {
            LogMessage("Le JSON est vide ou invalide.");
            return;
        }

        // 1. Extraction des colonnes (les clés du premier objet)
        var colonnes = Object.keys(donnees[0]);
        
        // 2. Construction de l'en-tête (thead)
        var htmlLigneEntete = "";
        $.each(colonnes, function(index, cle) {
            htmlLigneEntete = htmlLigneEntete + "<th>" + cle + "</th>";
        });
        var htmlThead = "<thead><tr>" + htmlLigneEntete + "</tr></thead>";

        // 3. Construction du corps du tableau (tbody)
        var htmlLignesCorps = "";
        $.each(donnees, function(index, element) {
            var htmlCellules = "";
            $.each(colonnes, function(i, cle) {
                var valeur = element[cle] !== null ? element[cle] : "";
                htmlCellules = htmlCellules + "<td>" + valeur + "</td>";
            });
            htmlLignesCorps = htmlLignesCorps + "<tr>" + htmlCellules + "</tr>";
        });
        var htmlTbody = "<tbody>" + htmlLignesCorps + "</tbody>";

        // 4. Assemblage final de la table HTML
        var htmlTableComplete = "<table border='1'>" + htmlThead + htmlTbody + "</table>";

        // Insertion du code HTML généré dans un conteneur de votre page (ex: #mon-conteneur-table)
        $("#mon-conteneur-table").html(htmlTableComplete);
        
        LogMessage("Tableau HTML généré avec succès.");
    }).fail(function() {
        LogMessage("Erreur lors de la récupération du JSON.");
    });
}

function LogMessage(msg){
    //alert(msg);
}
