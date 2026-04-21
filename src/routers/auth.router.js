const router = require("express").Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - phone_num
 *               - password
 *               - confirm_password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Kakajan"
 *               surname:
 *                 type: string
 *                 example: "Dovranov"
 *               email:
 *                 type: string
 *                 example: "john@gmail.com"
 *               phone_num:
 *                 type: string
 *                 example: "+99361234567"
 *               password:
 *                 type: string
 *                 example: "secret123"
 *               confirm_password:
 *                 type: string
 *                 example: "secret123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/register-admin:
 *   post:
 *     summary: Register a new ADMIN user (special endpoint)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - phone_num
 *               - password
 *               - confirm_password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Kakajan"
 *               surname:
 *                 type: string
 *                 example: "Dovranov"
 *               email:
 *                 type: string
 *                 example: "admin@gmail.com"
 *               phone_num:
 *                 type: string
 *                 example: "+99361122334"
 *               password:
 *                 type: string
 *                 example: "secret123"
 *               confirm_password:
 *                 type: string
 *                 example: "secret123"
 *     responses:
 *       201:
 *         description: Admin user registered successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/register-admin", authController.registerAdmin);


/**
 * @swagger
 * /api/auth/register-owner:
 *   post:
 *     summary: Register a new OWNER user (special endpoint)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - phone_num
 *               - password
 *               - confirm_password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Kakajan"
 *               surname:
 *                 type: string
 *                 example: "Dovranov"
 *               email:
 *                 type: string
 *                 example: "owner@gmail.com"
 *               phone_num:
 *                 type: string
 *                 example: "+99361122334"
 *               password:
 *                 type: string
 *                 example: "secret123"
 *               confirm_password:
 *                 type: string
 *                 example: "secret123"
 *     responses:
 *       201:
 *         description: Owner registered successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/register-owner", authController.registerOwner);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user (email or phone number)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Email address or phone number
 *                 example: "john@gmail.com or +99361234567"
 *               password:
 *                 type: string
 *                 example: "secret123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "your_refresh_token"
 *     responses:
 *       200:
 *         description: New access token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       403:
 *         description: Invalid refresh token
 */
router.post("/refresh", authController.refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "your_refresh_token"
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 *       400:
 *         description: Invalid token
 */
router.post("/logout", authController.logout);

module.exports = router;

/*
http://localhost:8080/api-docs

You'll see all 4 endpoints:

//  POST /api/auth/register
//  POST /api/auth/login
//  POST /api/auth/refresh
//  POST /api/auth/logout

*/