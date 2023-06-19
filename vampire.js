class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;

  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    let count = 0;

    const countOffspring = (vampire) => {
      count += vampire.offspring.length;
      for (const child of vampire.offspring) {
        countOffspring(child);
      }
    };
    
    countOffspring(this);
    return count;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;

    const countAncestors = (vampire) => {
      if (vampire.creator) {
        count ++;
        countAncestors(vampire.creator)
      }
    };

    countAncestors(this);
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }
  

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (const offspring of this.offspring) {
      const foundVampire = offspring.vampireWithName(name);
      if (foundVampire) {
        return foundVampire;
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
  
    const countDescendents = (vampire) => {
      count += vampire.offspring.length;
      for (const child of vampire.offspring) {
        countDescendents(child);
      }
    };
  
    countDescendents(this);
  
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    const millennialVampires = [];
  
    const collectMillennialVampires = (vampire) => {
      if (vampire.yearConverted > 1980) {
        millennialVampires.push(vampire);
      }
      for (const child of vampire.offspring) {
        collectMillennialVampires(child);
      }
    };
  
    collectMillennialVampires(this);
  
    return millennialVampires;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;