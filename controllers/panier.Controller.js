const Panier = require('../models/Panier');
const Produit = require('../models/Produit');

// 1.CREATE
exports.createPanier = async (req, res) => {
    try {
        const panier = new Panier(req.body);
        await panier.save();
        res.status(201).json({
            success: true,
            message: 'Panier créé',
            data: panier
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

//2. READ ALL
exports.getAllPaniers = async (req, res) => {
    try {
        const paniers = await Panier.find()
            .populate('client', 'nom')
            .populate('items.produit', 'nom prix');
        
        res.json({
            success: true,
            count: paniers.length,
            data: paniers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// READ ONE
exports.getPanierById = async (req, res) => {
    try {
        const panier = await Panier.findById(req.params.id)
            .populate('client', 'nom email')
            .populate('items.produit', 'nom prix description');
        
        if (!panier) {
            return res.status(404).json({
                success: false,
                error: 'Panier non trouvé'
            });
        }
        
        res.json({
            success: true,
            data: panier
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// GET BY CLIENT
exports.getPanierByClient = async (req, res) => {
    try {
        const panier = await Panier.findOne({ client: req.params.clientId })
            .populate('items.produit', 'nom prix image');
        
        if (!panier) {
            return res.status(404).json({
                success: false,
                error: 'Panier non trouvé pour ce client'
            });
        }
        
        res.json({
            success: true,
            data: panier
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 3.UPDATE
exports.updatePanier = async (req, res) => {
    try {
        const panier = await Panier.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!panier) {
            return res.status(404).json({
                success: false,
                error: 'Panier non trouvé'
            });
        }
        
        res.json({
            success: true,
            message: 'Panier mis à jour',
            data: panier
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// 4.DELETE
exports.deletePanier = async (req, res) => {
    try {
        const panier = await Panier.findByIdAndDelete(req.params.id);
        
        if (!panier) {
            return res.status(404).json({
                success: false,
                error: 'Panier non trouvé'
            });
        }
        
        res.json({
            success: true,
            message: 'Panier supprimé',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

