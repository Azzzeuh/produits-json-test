class Produit {
    constructor(nom, prix, quantite, imageUrl) {
        this.nom = nom;
        this.prix = prix;
        this.quantite = quantite;
        this.imageUrl = imageUrl;
    }

    // Méthode pour afficher le produit en HTML
    afficherDansTableau() {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${this.nom}</td>
            <td>${this.prix}€</td>
            <td>${this.quantite}</td>
            <td>${this.imageUrl ? `<img src="${this.imageUrl}" alt="${this.nom}" width="50" height="50">` : 'Aucune image'}</td>
        `;
        return row;
    }
}

const produits = []; // Initialisation du tableau pour stocker les produits

// Fonction pour ajouter un produit
function ajouterProduit(nom, prix, quantite, preuve) {
    const imageUrl = preuve ? URL.createObjectURL(preuve) : null; // Crée une URL pour l'image si elle existe
    const produit = new Produit(nom, prix, quantite, imageUrl);
    produits.push(produit);
    afficherProduits();
}

// Fonction pour afficher les produits dans le tableau
function afficherProduits() {
    const produitsBody = document.getElementById("produitsBody");
    produitsBody.innerHTML = ""; // Vide le tableau avant d'ajouter les produits

    produits.forEach(produit => {
        const row = produit.afficherDansTableau(); // Utilise la méthode pour créer une ligne
        produitsBody.appendChild(row);
    });
}

// Gestion de l'événement pour le formulaire
document.getElementById("produitForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const nom = document.getElementById("nom").value;
    const prix = document.getElementById("prix").value;
    const quantite = document.getElementById("quantite").value;
    const preuve = document.getElementById("preuve").files[0]; // Récupère le fichier

    ajouterProduit(nom, prix, quantite, preuve);

    // Réinitialise le formulaire
    this.reset();
});

// Fonction pour charger les produits depuis un fichier JSON
async function chargerProduits() {
    const url = "https://azzzeuh.github.io/produits-json-test/produits.json";
    try {
        const response = await fetch(url);
        const produitsData = await response.json();

        produitsData.forEach(data => {
            const produit = new Produit(data.nom, data.prix, data.quantite, data.imageUrl);
            produits.push(produit); // Ajoute le produit au tableau
        });
        
        afficherProduits(); // Affiche les produits chargés
    } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
    }
}

chargerProduits(); // Appelle la fonction pour charger les produits au démarrage
