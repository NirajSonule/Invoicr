import User from "../models/user";

const updateUser = async (req, res) => {
  const userId = req.user._id;
  const { username, email } = req.body;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (username) {
      const user_username = await User.findOne({
        username,
        _id: { $ne: userId },
      });
      if (user_username) {
        return res
          .status(400)
          .json({ success: false, message: "Username already exists" });
      }
      user.username = username;
    }

    if (email) {
      const user_email = await User.findOne({ email, _id: { $ne: userId } });
      if (user_email) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }
      user.email = email;
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.user._id;

  try {
    await User.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { updateUser, deleteUser };
