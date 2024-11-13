import { v4 as uuidv4 } from "uuid";

import userModel from "../model/user.js";

const isNameExist = async (name) => {
  try {
    const ship = await userModel.findOne({ name: name });
    return ship ? true : false;
  } catch (err) {
    console.log(err);
  }
};

const GET_ALL_USERS = async (req, res) => {
  try {
    let options = {};
    let query = {};

    if (req.query.qty) {
      options.limit = Number(req.query.qty);
    } else {
      options.limit = 10;
    }

    const results = await userModel.find(query, {}, options);
    if (results.length === 0) {
      return res.status(200).json({ responce: "Data not exist" });
    }

    return res.status(200).json({
      response: "success",
      users: results,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_USER_BY_ID = async (req, res) => {
  try {
    const user = await userModel.findOne({
      id: req.params.id,
    });
    if (!user) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    return res.status(200).json({ responce: "Ok", user: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const INSERT_USER = async (req, res) => {
  const newUser = {
    id: uuidv4(),
    name: req.body.name,
    position: req.body.position,
    age: req.body.age,
    sex: req.body.sex,
  };

  try {
    if (await isNameExist(newUser.name)) {
      throw new Error("Name already exist");
    }
  } catch (err) {
    return res.status(409).json({ response: err.message });
  }
  try {
    const user = new userModel(newUser);
    const response = await user.save();

    return res.status(201).json({
      response: "User was inserted successfully",
      user: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const UPDATE_USER_BY_ID = async (req, res) => {
  try {
    const user = await userModel.updateOne(
      {
        id: req.params.id,
      },
      { ...req.body }
    );
    if (!user) {
      return res.status(404).json({ response: "User not exist" });
    }
    return res.status(200).json({ response: "User was updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_USER_BY_ID = async (req, res) => {
  try {
    const user = await userModel.deleteOne({ id: req.params.id });

    if (!user.deletedCount) {
      return res.status(404).json({ response: "User not found" });
    }

    return res.status(200).json({ response: "User was deleted successfully" });
  } catch (err) {
    return res.status(404).json({ response: err.message });
  }
};

export {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  INSERT_USER,
  UPDATE_USER_BY_ID,
  DELETE_USER_BY_ID,
};
