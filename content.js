document.addEventListener("DOMContentLoaded", function () {
    // Sélectionnez les éléments du DOM
    const favoritesList = document.getElementById("favoritesList");
    const addFavoriteButton = document.getElementById("addFavorite");
  
    // Fonction pour afficher les liens favoris
    function displayFavorites() {
      // Obtenez les liens favoris depuis le stockage local de Chrome
      chrome.storage.local.get("favorites", function (result) {
        const favorites = result.favorites || [];
  
        // Effacez la liste actuelle
        favoritesList.innerHTML = "";
  
        // Ajoutez chaque lien favori à la liste
        for (const favorite of favorites) {
          const listItem = document.createElement("li");
          const link = document.createElement("a"); // Créez un élément <a> pour le lien
          link.href = favorite; // Définissez l'URL du lien
          link.textContent = favorite; // Définissez le texte du lien
  
          const deleteButton = document.createElement("button");
          deleteButton.classList.add('sup-button')
          deleteButton.textContent = "Supprimer";
          deleteButton.addEventListener("click", function () {
            // Supprimez le lien favori
            const updatedFavorites = favorites.filter(fav => fav !== favorite);
            chrome.storage.local.set({ favorites: updatedFavorites }, function () {
              // Rafraîchissez la liste des liens favoris
              displayFavorites();
            });
          });
  
          listItem.appendChild(link); // Ajoutez le lien à l'élément <li>
          listItem.appendChild(deleteButton); // Ajoutez le bouton de suppression
          favoritesList.appendChild(listItem); // Ajoutez l'élément <li> à la liste
        }
      });
    }
  
    // Affichez les liens favoris au chargement de la page
    displayFavorites();
  
    // Fonction pour ajouter un lien favori
    function addFavorite() {
      const newFavorite = prompt("Entrez l'URL de votre lien favori :");
  
      if (newFavorite) {
        // Obtenez les liens favoris actuels
        chrome.storage.local.get("favorites", function (result) {
          const favorites = result.favorites || [];
  
          // Ajoutez le nouveau lien favori
          favorites.push(newFavorite);
  
          // Mettez à jour le stockage local
          chrome.storage.local.set({ favorites }, function () {
            // Affichez à nouveau les liens favoris mis à jour
            displayFavorites();
          });
        });
      }
    }
  
    // Ajoutez un événement de clic au bouton "Ajouter un Lien Favori"
    addFavoriteButton.addEventListener("click", addFavorite);
  });
  