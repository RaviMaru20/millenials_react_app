const planets = [
  "Asgard",
  "Xandar",
  "Wakanda",
  "Sakaar",
  "Knowhere",
  "Ego's Planet",
  "Titan",
  "Kree-Lar",
  "Vormir",
  "Xorriath",
  "Nova Prime",
  "Dark Dimension",
  "Attilan",
  "Genosha",
  "Lemuria",
  "Krakoa",
  "Morag",
  "Eternos",
  "Surtur's Realm",
  "Bifrostia",
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
  "Moon"
];

const sciFiOccupations = [
  "Cosmic Enforcer",
  "Reality Warper",
  "Web-Slinger Technician",
  "Mutant Geneticist",
  "Vibranium Engineer",
  "Super Soldier Trainer",
  "Time Stone Archaeologist",
  "Space-Time Navigator",
  "Infinity Gem Curator",
  "Telepathic Communicator",
  "Cosmic Sorcerer",
  "Thunder God Ambassador",
  "Quantum Realm Explorer",
  "Mind Stone Analyst",
  "Star-Lord's Navigator",
  "Guardian of the Galaxy",
  "Wakandan Technologist",
  "Anti-Matter Theorist",
  "Hulk Therapist",
  "Multiverse Traveler"
];

export function getRandomName(type) {
  if (type === 'occupation') {
    // Return a random sci-fi occupation
    const randomIndex = Math.floor(Math.random() * sciFiOccupations.length);
    return sciFiOccupations[randomIndex];
  } else if (type === 'planet') {
    // Return a random planet name
    const randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];
  } else {
    // Invalid argument, return an error message
    return 'Invalid argument. Use "occupation" or "planet".';
  }
}