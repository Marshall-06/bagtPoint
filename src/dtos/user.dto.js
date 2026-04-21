exports.userResponseDTO = (user) => {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    phone_num: user.phone_num,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };
};