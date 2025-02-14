import express from 'express';
const router = express.Router();
const baseUrl= "/api/v1";
// router.use(`${baseUrl}/user`, userRoutes);
router.get(`${baseUrl}/user/get`, (req, res) => {
    res.json({ message: 'Welcome to the User API!' });
  });

export default router;