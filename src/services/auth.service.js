const { User } = require("../models/model");
const userResponseDTO = require("../dtos/user.dto");
const adminResponseDTO = require("../dtos/admin.dto");
const { hashPassword, comparePassword } = require("../utils/hash.util");
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require("../utils/jwt.util");

class AuthService {

    async register(data) {
        const { name, surname, email, phone_num, password, confirm_password } = data;

        // validate required fields
        if (!name || !surname || !email || !phone_num || !password || !confirm_password) {
            throw new Error("Missing required fields: name, surname, email, phone_num, password, confirm_password");
        }

        // check if passwords match
        if (password !== confirm_password) {
            throw new Error("Passwords do not match");
        }

        // check if phone number already exists
        const existingByPhone = await User.findOne({ where: { phone_num } });
        if (existingByPhone) throw new Error("User with this phone number already exists");

        // check if email already exists
        const existingByEmail = await User.findOne({ where: { email } });
        if (existingByEmail) throw new Error("User with this email already exists");

        // hash password
        const hashed = await hashPassword(password);

        // create user
        const user = await User.create({
            name,
            surname,
            email,
            phone_num,
            password: hashed,
            role: "user"
        });

        // generate tokens
        const accessToken = generateAccessToken({ id: user.id, role: user.role });
        const refreshToken = generateRefreshToken({ id: user.id });
        user.refresh_token = refreshToken;
        await user.save();

        return {
            user: userResponseDTO(user),
            accessToken,
            refreshToken
        };
    }

    async registerAdmin(data) {
        const { name, surname, email, phone_num, password, confirm_password } = data;

        // validate required fields
        if (!name || !surname || !email || !phone_num || !password || !confirm_password) {
            throw new Error("Missing required fields: name, surname, email, phone_num, password, confirm_password");
        }

        // check if passwords match
        if (password !== confirm_password) {
            throw new Error("Passwords do not match");
        }

        // check if phone number already exists
        const existingByPhone = await User.findOne({ where: { phone_num } });
        if (existingByPhone) throw new Error("User with this phone number already exists");

        // check if email already exists
        const existingByEmail = await User.findOne({ where: { email } });
        if (existingByEmail) throw new Error("User with this email already exists");

        // hash password
        const hashed = await hashPassword(password);

        // create admin user
        const user = await User.create({
            name,
            surname,
            email,
            phone_num,
            password: hashed,
            role: "admin"
        });

        // generate tokens
        const accessToken = generateAccessToken({ id: user.id, role: user.role });
        const refreshToken = generateRefreshToken({ id: user.id });
        user.refresh_token = refreshToken;
        await user.save();

        return {
            user: userResponseDTO(user),
            accessToken,
            refreshToken
        };
    }

    async registerOwner(data) {
    const { name, surname, email, phone_num, password, confirm_password, avatar_img } = data;

    // validate required fields
    if (!name || !surname || !email || !phone_num || !password || !confirm_password) {
        throw new Error("Missing required fields: name, surname, email, phone_num, password, confirm_password");
    }

    // check if passwords match
    if (password !== confirm_password) {
        throw new Error("Passwords do not match");
    }

    // check if phone number already exists
    const existingByPhone = await User.findOne({ where: { phone_num } });
    if (existingByPhone) throw new Error("User with this phone number already exists");

    // check if email already exists
    const existingByEmail = await User.findOne({ where: { email } });
    if (existingByEmail) throw new Error("User with this email already exists");

    // hash password — same as register/registerAdmin
    const hashed = await hashPassword(password);

    // create owner user
    const user = await User.create({
        name,
        surname,
        email,
        phone_num,
        password: hashed,
        role: "owner",
        avatar_img: avatar_img ?? null,
    });

    // generate tokens — same pattern as register/registerAdmin
    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });
    user.refresh_token = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
}

    async login(identifier, password) {
        // auto-detect: if identifier contains '@' treat as email, else as phone_num
        const isEmail = identifier.includes("@");
        const whereClause = isEmail
            ? { email: identifier }
            : { phone_num: identifier };

        const user = await User.findOne({ where: whereClause });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const accessToken = generateAccessToken({
            id: user.id,
            role: user.role
        });

        const refreshToken = generateRefreshToken({ id: user.id });

        user.refresh_token = refreshToken;
        await user.save();

        return { user, accessToken, refreshToken };
    }

    async refresh(token) {
        const decoded = verifyRefreshToken(token);

        const user = await User.findByPk(decoded.id);
        if (!user || user.refresh_token !== token) {
            throw new Error("Invalid refresh token");
        }

        const newAccessToken = generateAccessToken({
            id: user.id,
            role: user.role
        });

        return newAccessToken;
    }

    async logout(token) {
        const decoded = verifyRefreshToken(token);

        const user = await User.findByPk(decoded.id);
        if (!user) throw new Error("User not found");

        user.refresh_token = null;
        await user.save();
    }
}

module.exports = new AuthService();