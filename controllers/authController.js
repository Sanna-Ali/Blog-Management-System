const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
/**-----------------------------------------------
 * @desc    Register New User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "user already exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  // Response to the client
  res.status(201).json({
    message: "Your account has been successfully registered",
  });
});
/**-----------------------------------------------
 * @desc     Login
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }
  const token = user.generateAuthToken();
  res.status(200).json({
    id: user._id,
    role: user.role,
    token,
  });
});
