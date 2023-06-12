import express from "express";
import { ValidationError } from "objection";

import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const itineraries = await req.user.$relatedQuery("itineraries")
    return res.status(200).json({ user: req.user, itineraries: itineraries });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});



usersRouter.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ username, email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/image", async (req, res) => {
  try {
    const userToReturn = await User.query().findById(req.user.id)
    return res.status(200).json({ photo: userToReturn.imageURL})
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

usersRouter.post("/image", uploadImage.single("image"), async (req, res) =>{
  try {
    const { body } = req
    const data = {
      ...body,
      image: req.file.location
    };
    const user = await User.query().findById(req.user.id)
    await user.$query().patch({ imageURL: req.file.location })
    return res.status(201).json({ photo: user.imageURL })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})
export default usersRouter;