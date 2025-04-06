// Initialisation de la carte avec Leaflet
var map = L.map('map').setView([46.603354, 1.888334], 6);  // Centrer la carte sur la France

// Ajouter une couche de tuiles à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Charger les données depuis le fichier JSON (communes)
fetch('data/communes.json')  // Assure-toi que le chemin vers le fichier JSON est correct
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Vérifie que les données sont bien chargées

    // Pour chaque commune dans les données
    data.forEach(commune => {
      const lat = commune.latitude;
      const lon = commune.longitude;
      const population = commune.population;

      // Calcule la taille du cercle en fonction de la population
      const radius = Math.sqrt(population) / 10;

      // Ajouter un cercle pour chaque commune sur la carte
      L.circle([lat, lon], {
        radius: radius,
        color: 'blue',
        weight: 1,
        opacity: 1,
        fillColor: 'blue',
        fillOpacity: 0.5
      }).addTo(map);
    });
  })
  .catch(error => console.log('Erreur lors du chargement du fichier JSON :', error));
