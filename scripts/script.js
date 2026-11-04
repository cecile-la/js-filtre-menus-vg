/*
 * Filtre des menus — Vite & Gourmand (traiteur fictif)
 * ----------------------------------------------------
 * Ce script charge la liste des menus depuis un fichier JSON,
 * l'affiche dans la page, et la filtre par prix maximum, sans rechargement.
 *
 * Fonctionnement : chargerMenus() récupère les données,
 * afficherMenus() les écrit dans la page, surSaisiePrix() filtre
 * à chaque frappe, demarrer() charge, affiche et branche le filtre.
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

// Zone de la page où afficher un message sur la liste (index.html)
const zoneMessage = document.getElementById("message-menus");

// Champ du prix maximum (index.html)
// Écrit dans le HTML : il existe toujours, même si le chargement échoue
const champPrixMaximum = document.getElementById("filtre-prix-menus");

// Liste partagée des menus chargés
// (remplie dans demarrer, relue par surSaisiePrix)
let menusCharges = [];


/* -------------------------------- Fonctions -------------------------------- */

// Charge les menus et renvoie un tableau d'objets (un objet par menu).
// Deux await : un pour la réponse du serveur, un pour son contenu lu en JSON.
// Attention : fetch ne signale pas un 404 tout seul (protection : branche gestion-erreurs)
async function chargerMenus() {
    const reponse = await fetch(cheminFichierMenus);
    const menus = await reponse.json();
    return menus;
}

// Affiche une ligne par menu reçu, ou un message si aucun menu n'est reçu.
// Séparée du chargement : le filtre la rappelle avec une partie des menus,
// sans recharger le fichier.
function afficherMenus(menus) {
    // Vide la liste et le message avant d'afficher : sinon les anciennes
    // lignes et l'ancien message restent à chaque saisie
    zoneListe.textContent = "";
    zoneMessage.textContent = "";
    if (menus.length === 0) {
        zoneMessage.textContent = "Aucun menu ne correspond à la recherche.";
    }

    for (const menu of menus) {
        const ligneMenu = document.createElement("li");
        // textContent et pas innerHTML : le texte n'est jamais exécuté (XSS)
        ligneMenu.textContent = `${menu.titre} : ${menu.prixPourPersonnesMinimum.toFixed(2)} € pour ${menu.nombrePersonnesMinimum} personnes`;
        zoneListe.appendChild(ligneMenu);
    }
}

// Réagit à chaque saisie dans le champ du prix maximum.
// Champ vide : réaffiche tous les menus chargés.
// Sinon : garde les menus dont le prix ne dépasse pas la saisie, puis les affiche.
function surSaisiePrix() {
    const saisiePrix = champPrixMaximum.value;
    if (saisiePrix === "") {
        afficherMenus(menusCharges);
        return;
    }
    const prixMaximum = Number(saisiePrix);
    if (Number.isNaN(prixMaximum) || prixMaximum < 0) {
        console.log("Saisie invalide");
        return;
    }
    const menusFiltres = menusCharges.filter((menu) => menu.prixPourPersonnesMinimum <= prixMaximum);
    afficherMenus(menusFiltres);
}


/* -------------------------------- Exécution -------------------------------- */

// Fonction async pour pouvoir attendre le chargement avant d'afficher
async function demarrer() {
    const menus = await chargerMenus();
    // On garde les menus dans la liste partagée : le fichier n'est chargé
    // qu'une fois, et surSaisiePrix réutilise ces menus à chaque frappe
    menusCharges = menus;
    afficherMenus(menus);
    // Branché ici, après l'affichage : le filtre ne peut pas s'exécuter
    // avant l'arrivée des menus.
    // "input" et pas "change" : réagit à chaque frappe, pas en quittant le champ.
    // surSaisiePrix sans () : c'est le navigateur qui l'appellera.
    champPrixMaximum.addEventListener("input", surSaisiePrix);
}

demarrer();
