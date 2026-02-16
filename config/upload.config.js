const multer = require("multer");
const path = require('path');
const fs = require('fs');

// Configuration de base pour différents types d'images
const createStorage = (subFolder) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `public/images/${subFolder}`;
      
      // Créer le dossier s'il n'existe pas
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const originalName = file.originalname;
      const fileExtension = path.extname(originalName);
      const baseName = path.basename(originalName, fileExtension);
      
      // Générer un nom unique avec timestamp
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const fileName = `${baseName}_${timestamp}_${randomString}${fileExtension}`;
      
      cb(null, fileName);
    }
  });
};

// Filtre pour vérifier que c'est bien une image
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Seules les images sont autorisées"));
  }
};

// Configuration pour chaque entité
const upload = {
  // Pour les animaux
  animal: multer({ 
    storage: createStorage('animaux'),
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
  }),
  
  // Pour les clients
  client: multer({ 
    storage: createStorage('clients'),
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  }),
  
  // Pour les produits
  produit: multer({ 
    storage: createStorage('produits'),
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  }),
  
  // Pour les livreurs (permis, photo)
  livreur: multer({ 
    storage: createStorage('livreurs'),
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  }),
  
  // Pour les évaluations (photos des plats)
  evaluation: multer({ 
    storage: createStorage('evaluations'),
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  }),
  
  // Pour les commandes (factures, tickets)
  commande: multer({ 
    storage: createStorage('commandes'),
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  }),
  
  // Pour les paniers (peut-être pas nécessaire)
  panier: multer({ 
    storage: createStorage('paniers'),
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  }),
  
  // Pour les utilisateurs
  user: multer({ 
    storage: createStorage('users'),
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  })
};

module.exports = upload;