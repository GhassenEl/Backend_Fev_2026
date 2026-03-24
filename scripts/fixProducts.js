// scripts/fixProducts.js
const mongoose = require('mongoose');
const Produit = require('../models/Produit'); // Assurez-vous que le chemin est correct

async function fixProducts() {
  try {
    // Connexion à MongoDB
    await mongoose.connect('mongodb://localhost:27017/petfoodtn', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(' Connecté à MongoDB\n');
    
    // Récupérer tous les produits
    const produits = await Produit.find();
    console.log(` ${produits.length} produits trouvés\n`);
    
    let modifiés = 0;
    
    for (let produit of produits) {
      let besoinModif = false;
      const original = produit.toObject();
      
      // 1. Corriger category → categorie
      if (original.category && !produit.categorie) {
        produit.categorie = original.category;
        produit.category = undefined;
        besoinModif = true;
        console.log(`   - ${produit.nom}: category → categorie`);
      }
      
      // 2. Supprimer le champ name (redondant)
      if (original.name) {
        produit.name = undefined;
        besoinModif = true;
        console.log(`   - ${produit.nom}: champ 'name' supprimé`);
      }
      
      // 3. Supprimer numeroHp
      if (original.numeroHp) {
        produit.numeroHp = undefined;
        besoinModif = true;
        console.log(`   - ${produit.nom}: champ 'numeroHp' supprimé`);
      }
      
      // 4. Ajouter animalCible si manquant
      if (!produit.animalCible) {
        produit.animalCible = 'tous';
        besoinModif = true;
        console.log(`   - ${produit.nom}: animalCible ajouté = 'tous'`);
      }
      
      // 5. Vérifier que categorie est valide
      const categoriesValides = ['alimentation', 'accessoires', 'soins', 'jouets', 'hygiène'];
      if (produit.categorie && !categoriesValides.includes(produit.categorie)) {
        console.log(`   ${produit.nom}: catégorie '${produit.categorie}' invalide, à corriger manuellement`);
      }
      
      // Sauvegarder si modifié
      if (besoinModif) {
        await produit.save();
        modifiés++;
        console.log(`    ${produit.nom} corrigé\n`);
      }
    }
    
    console.log(`\n Correction terminée !`);
    console.log(` ${modifiés} produit(s) modifié(s) sur ${produits.length}`);
    
    // Afficher un exemple corrigé
    const exemple = await Produit.findOne();
    console.log(`\n Exemple de produit corrigé :`);
    console.log(JSON.stringify(exemple, null, 2));
    
    process.exit(0);
    
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
}

fixProducts();