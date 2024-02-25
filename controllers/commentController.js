const Comment = require('../models/commentModel');

exports.createComment = async (req, res) => {
  try {
    const { content, parentId ,level} = req.body;
    console.log(req.body);
    const newComment = await Comment.create({ content, parentId ,level});
    res.status(201).json(newComment);
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  
};

const getCommentsUtil = async(level,CommentID) => {
  let comments = [];
  if(!CommentID){
    comments = await Comment.find({level:level});
  }
  else{
    comments = await Comment.find({level:level, parentId:CommentID});
  }
  // console.log(comments);
  const result = [];

  for (const comment of comments) {
     
      const replies = await getCommentsUtil(level + 1, comment.id);
      const commentWithReplies = { _id: comment._id,content : comment.content,level : comment.level, replies };
      // console.log(replies);
      result.push(commentWithReplies);
    
  }
  

  return result;
}
exports.getComments = async (req, res) => {
  try {
    const comments = await getCommentsUtil(0);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
