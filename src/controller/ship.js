import { v4 as uuidv4 } from "uuid";

import shipModel from "../model/ship.js";

const isNameExist = async (name) => {
  try {
    const ship = await shipModel.findOne({ name: name });
    return ship ? true : false;
  } catch (err) {
    console.log(err);
  }
};

const GET_ALL_SHIPS = async (req, res) => {
  try {
    let options = {};
    let query = {};

    if (req.query.type) {
      query = { type: req.query.type };
    }

    if (req.query.qty) {
      options.limit = Number(req.query.qty);
    }

    if (req.query.sort) {
      options.sort = `-${req.query.sort}`;
    }
    console.log(query, options);
    const results = await shipModel.find(query, {}, options);

    if (results.length === 0) {
      return res.status(200).json({ responce: "Data not exist" });
    }

    return res.status(200).json({
      response: "success",
      ships: results,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_SHIP_BY_ID = async (req, res) => {
  try {
    const ship = await shipModel.findOne({
      id: req.params.id,
    });
    if (!ship) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    return res.status(200).json({ responce: "Ok", ship: ship });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const INSERT_SHIP = async (req, res) => {
  const newShip = {
    id: uuidv4(),
    name: req.body.name,
    type: req.body.type,
    home_port: req.body.home_port,
    image: req.body.image,
    roles: req.body.roles,
    year_built: req.body.year_built,
    mass_kg: req.body.mass_kg,
  };
  try {
    if (await isNameExist(newShip.name)) {
      throw new Error("Title already exist");
    }
  } catch (err) {
    return res.status(409).json({ response: err.message });
  }
  try {
    const ship = new shipModel(newShip);
    const response = await ship.save();

    return res.status(201).json({
      response: "Ship was inserted successfully",
      ship: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const UPDATE_SHIP_BY_ID = async (req, res) => {
  try {
    const ship = await shipModel.updateOne(
      {
        id: req.params.id,
      },
      { ...req.body }
    );
    if (!ship) {
      return res.status(404).json({ response: "Ship not exist" });
    }
    return res.status(200).json({ response: "Ship was updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_SHIP_BY_ID = async (req, res) => {
  try {
    const ship = await shipModel.deleteOne({ id: req.params.id });

    if (!ship.deletedCount) {
      return res.status(404).json({ response: "Ship not found" });
    }

    return res.status(200).json({ response: "Ship was deleted successfully" });
  } catch (err) {
    return res.status(404).json({ response: err.message });
  }
};

const GET_RANDOM_SHIP = async (req, res) => {
  try {
    const shipsQty = await shipModel.countDocuments();

    const randomIndex = Math.floor(Math.random() * (shipsQty - 1 + 1) + 0);
    const ship = await shipModel.findOne().skip(randomIndex).limit(1);
    if (!ship) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    return res.status(200).json({ responce: "Ok", ship: ship });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

export {
  GET_ALL_SHIPS,
  GET_SHIP_BY_ID,
  DELETE_SHIP_BY_ID,
  INSERT_SHIP,
  UPDATE_SHIP_BY_ID,
  GET_RANDOM_SHIP,
};
