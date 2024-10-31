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
            <td><img src="${this.imageUrl}" alt="${this.nom}" width="50" height="50"></td>
        `;
        return row;
    }
}


async function chargerProduits() {
    const url = "https://raw.githubusercontent.com/[ton-utilisateur]/produit-json-test/main/produits.json";
    try {
        const response = await fetch(url);
        const produitsData = await response.json();

        const tableBody = document.getElementById('produitsTable').querySelector('tbody');
        produitsData.forEach(data => {
            const produit = new Produit(data.nom, data.prix, data.quantite, data.imageUrl);
            const row = produit.afficherDansTableau();
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
    }
}

chargerProduits();
