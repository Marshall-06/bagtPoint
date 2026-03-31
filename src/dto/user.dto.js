const userResponseDTO = (user) => {
    if (!user) return null;

    return {
        id: user.id,
        name: user.name || null,
        surname: user.surname || null,
        email: user.email || null,
        phone_num: user.phone_num,
        role: user.role,
    };
};


module.exports = userResponseDTO;