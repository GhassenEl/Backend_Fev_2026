const animalModel = require("../models/animal.model");

module.exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await animalModel.find();
    if (animals.length === 0) {
      throw new Error("No animals found");
    }
    res
      .status(200)
      .json({ message: "Animals retrieved successfully", data: animals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAnimalById = async (req, res) => {
  try {
    const animalId = req.params.id;

    const animal = await animalModel.findById(animalId);
    if (!animal) {
      throw new Error("Animal not found");
    }
    res
      .status(200)
      .json({ message: "Animal retrieved successfully", data: animal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createAnimal = async (req, res) => {
  try {
    const { nom, espece, race, age, poids, proprietaire_id } = req.body;
    const newAnimal = new animalModel({
      nom,
      espece,
      race,
      age,
      poids,
      proprietaire_id,
    });
    await newAnimal.save();
    res
      .status(201)
      .json({ message: "Animal created successfully", data: newAnimal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateAnimal = async (req, res) => {
  try {
    const animalId = req.params.id;
    const { nom, espece, race, age, poids, proprietaire_id } = req.body;
    const updatedAnimal = await animalModel.findByIdAndUpdate(
      animalId,
      { nom, espece, race, age, poids, proprietaire_id },
      { new: true },
    );
    if (!updatedAnimal) {
      throw new Error("Animal not found");
    }
    res
      .status(200)
      .json({ message: "Animal updated successfully", data: updatedAnimal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteAnimal = async (req, res) => {
  try {
    const animalId = req.params.id;
    const deletedAnimal = await animalModel.findByIdAndDelete(animalId);
    if (!deletedAnimal) {
      throw new Error("Animal not found");
    }
    res
      .status(200)
      .json({ message: "Animal deleted successfully", data: deletedAnimal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createAnimalWithImage = async (req, res) => {
  try {
    const { nom, espece, race, age, poids, proprietaire_id } = req.body;
    const animal_image = req.file.filename;
    const newAnimal = new animalModel({
      nom,
      espece,
      race,
      age,
      poids,
      proprietaire_id,
      animal_image,
    });
    await newAnimal.save();
    res
      .status(201)
      .json({ message: "Animal created successfully", data: newAnimal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
