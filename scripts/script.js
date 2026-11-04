/*
 * Filtre des menus — Vite & Gourmand (traiteur fictif)
 * ----------------------------------------------------
 * Ce script charge la liste des menus depuis un fichier JSON
 * et l'affiche dans la page, sans rechargement.
 * Les filtres (prix, thème, régime) s'appuient sur ces deux fonctions.
 *
 * Fonctionnement : chargerMenus() récupère les données,
 * afficherMenus() les écrit dans la page, demarrer() enchaîne les deux.
 *
 * À lancer avec Live Server (http://127.0.0.1:5500) :
 * ouvert en file://, le navigateur bloque fetch.
 */

// Chemin du fichier des menus, depuis index.html
// (à l'ECF, ce sera l'adresse de l'API du serveur)
const cheminFichierMenus = "data/menus.json";

// Zone de la page où afficher les menus (index.html)
// Trouvée dès le départ grâce à defer : le HTML est déjà analysé
const zoneListe = document.getElementById("liste-menus");

// Fonctions

// Charge les menus et renvoie un tableau d'objets (un objet par menu).
// Deux await : un pour la réponse du serveur, un pour son contenu lu en JSON.
// Attention : fetch ne signale pas un 404 tout seul (protection : branche gestion-erreurs)
async function chargerMenus() {
    const reponse = await fetch(cheminFichierMenus);
    const menus = await reponse.json();
    return menus;
}

// Affiche une ligne par menu reçu.
// Séparée du chargement : le filtre la rappellera avec une partie des menus,
// sans recharger le fichier.
function afficherMenus(menus) {
    for (const menu of menus) {
        const ligneMenu = document.createElement("li");
        // textContent et pas innerHTML : le texte n'est jamais exécuté (XSS)
        ligneMenu.textContent = menu.titre;
        zoneListe.appendChild(ligneMenu);
    }
}

// Exécution

// Fonction async pour pouvoir attendre le chargement avant d'afficher
async function demarrer() {
    const menus = await chargerMenus();
    afficherMenus(menus);
}

demarrer();
