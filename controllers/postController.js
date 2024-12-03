const asyncHandler = require("express-async-handler");
const {
  Post,
  validateCreatePost,
  validateUpdatePost,
} = require("../models/Post");
/**-----------------------------------------------
 * @desc    Create New post
 * @route   /api/post/add
 * @method  POST
 * @access  
 ------------------------------------------------*/
module.exports.createPostCtrl = asyncHandler(async (req, res) => {
  // 1. Validation for data
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // 2. Add post
  let newPost = new Post(req.body);
  if (req.body.isPublished) {
    newPost.publishDate = Date.now();
  }
  (newPost.user = req.user.id), await newPost.save();
  res.status(201).json(newPost);
});
/**-----------------------------------------------
 * @desc    Update post
 * @route   /api/posts/:id
 * @method  PUT
 * @access  private (only owner of the post) 
 ------------------------------------------------*/
module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  // 1. Validation
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // 2. Get the post from DB and check if post exist
  const post = await Post.findById(req.body.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 3. check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied, you are not allowed" });
  }
  // 4. update post
  const updatedPost = await Post.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  await updatedPost.save();
  // 5. Send response to the client
  res.status(200).json(updatedPost);
});
/**-----------------------------------------------
 * @desc    Delete Post
 * @route   /api/posts/delete/:id
 * @method  DELETE
 * @access  private (only admin or owner of the post)
 ------------------------------------------------*/
module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.post);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  await Post.findByIdAndDelete(req.body.id);
  res.status(200).json({
    message: "post has been deleted successfully",
    postId: post._id,
  });
});
/**-----------------------------------------------
 * @desc    publish Post
 * @route   /api/posts/publish/:id
 * @method  PUT
 * @access  private (only admin or owner of the post)
 *  ------------------------------------------------*/
module.exports.publishPostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.post);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  post.isPublished = true;
  post.publishDate = Date.now();
  console.log(post.publishDate);
  await post.save();
  res.status(200).json(post);
});
/**-----------------------------------------------
 * @desc    Get Posts
 * @route   /api/posts/
 * @method  GET
 * @access  public
 *  ------------------------------------------------*/
module.exports.getPostCtrl = asyncHandler(async (req, res) => {
  const posts = await Post.find({ isPublished: true }).sort({
    publishDate: -1,
  });
  res.status(200).json(posts);
});
/**-----------------------------------------------
 * @desc    search for Post
 * @route   /api/post/search?keyword=something
 * @method  POST
 * @access  private
 *  ------------------------------------------------*/
module.exports.searchForPost = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  if (keyword) {
    const posts = await Post.find({
      title: { $regex: keyword, $options: "i" },
    });
    if (posts.length == 0) {
      return res.status(404).json("Post Not found");
    }
    res.status(200).json(posts);
  }
});
/**-----------------------------------------------
 * @desc    Get All Posts
 * @route   /api/post/get
 * @method  POST
 * @access  private
 *  ------------------------------------------------*/
module.exports.getPostAdminCtrl = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({
    publishDate: -1,
  });
  if (posts.length == 0) {
    return res.status(404).json("Post Not found");
  }
  res.status(200).json(posts);
});
