// ==================================================
// DONNÉES DE DÉPART DE CINEBOOK
// ==================================================
// Ce tableau représente les films proposés par le cinéma.
// Il est chargé avant app.js : la variable "films" y est donc disponible.
// Chaque séance possède sa propre liste de sièges déjà occupés.

 var films = [
  {
    id: 1,
    titre: "Mission Galaxie",
    genre: "Science-fiction",
    duree: 124,
    prix: 55,
    affiche: "assets/images/mission-galaxie.png",
    description: "Une exploratrice suit un signal inconnu jusqu'aux confins d'une galaxie oubliée.",
    reserve: false,
    seances: [
      { id: 101, horaire: "14:00", siegesOccupes: ["A1", "A2", "B3", "D5"] },
      { id: 102, horaire: "17:30", siegesOccupes: ["A4", "B1", "B2", "C6", "E3"] },
      { id: 103, horaire: "21:00", siegesOccupes: ["A6", "C2", "C3", "D4", "E5"] }
    ]
  },
  {
    id: 2,
    titre: "Minuit à Casablanca",
    genre: "Thriller",
    duree: 108,
    prix: 50,
    affiche: "assets/images/minuit-casablanca.png",
    description: "Une nuit pluvieuse, un projectionniste découvre un secret caché dans une bobine ancienne.",
    reserve: false,
    seances: [
      { id: 201, horaire: "16:15", siegesOccupes: ["A3", "B4", "C1"] },
      { id: 202, horaire: "19:00", siegesOccupes: ["A1", "A5", "C4", "D2", "E6"] }
    ]
  },
  {
    id: 3,
    titre: "Le Secret de l'Atlas",
    genre: "Aventure",
    duree: 116,
    prix: 45,
    affiche: "assets/images/secret-atlas.png",
    description: "Deux jeunes voyageurs partent à la recherche d'une porte légendaire au cœur des montagnes.",
    reserve: false,
    seances: [
      { id: 301, horaire: "13:30", siegesOccupes: ["B2", "B3", "D1"] },
      { id: 302, horaire: "16:45", siegesOccupes: ["A2", "C3", "C4", "E1"] },
      { id: 303, horaire: "19:30", siegesOccupes: ["A5", "B6", "D3", "D4"] }
    ]
  },
  {
    id: 4,
    titre: "Dernière Fréquence",
    genre: "Drame futuriste",
    duree: 132,
    prix: 60,
    affiche: "assets/images/derniere-frequence.png",
    description: "La dernière opératrice radio d'une ville côtière reçoit un message qui change tout.",
    reserve: false,
    seances: [
      { id: 401, horaire: "15:00", siegesOccupes: ["A1", "B5", "C2", "E4"] },
      { id: 402, horaire: "18:15", siegesOccupes: ["A3", "A4", "C5", "D6"] },
      { id: 403, horaire: "21:30", siegesOccupes: ["B1", "B2", "C3", "D4", "E5", "E6"] }
    ]
  }
];

// La salle compte 5 rangées (A à E) de 6 sièges : 30 places.
const rangees = ["A", "B", "C", "D", "E"];
const siegesParRangee = 6;
