const { refresh } = require("../services/auth.serivce");

exports.adminResponseDTO = (user) => {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone_num: user.phone_num,
    avatar_img: user.avatar_img,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };
};