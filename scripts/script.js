// Chemin du fichier des menus, depuis index.html
const cheminFichierMenus = "data/menus.json";

// Zone de la page où afficher les menus (index.html)
const zoneListe = document.getElementById("liste-menus");

// Fonctions
async function chargerMenus() {
    const reponse = await fetch(cheminFichierMenus);
    const menus = await reponse.json();
    return menus;
}

function afficherMenus(menus) {
    for (const menu of menus) {
        const ligneMenu = document.createElement("li");
        ligneMenu.textContent = menu.titre;
        zoneListe.appendChild(ligneMenu);
    }
}

// Exécution
async function demarrer() {
    const menus = await chargerMenus();
    afficherMenus(menus);
}

demarrer();
