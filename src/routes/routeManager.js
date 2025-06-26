const express = require('express')
const productRoutes = require('./productRoutes')
const typeRoutes = require('./typeRoutes')
const workRoutes = require('./workRoutes')
const rentRoutes = require('./rentRoutes')
const userRoutes =require('./userRoutes')
const router = express.Router();
const baseUrl = "/api/v1";
router.use(`${baseUrl}/user`, userRoutes);
router.use(`${baseUrl}/inventory/product`, productRoutes);
router.use(`${baseUrl}/inventory/type`, typeRoutes);
router.use(`${baseUrl}/inventory/work`, workRoutes);
router.use(`${baseUrl}/rent`, rentRoutes);

module.exports = router;
