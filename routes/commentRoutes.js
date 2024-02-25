const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.getComments);
router.post('/', commentController.createComment);
router.delete('/:id', commentController.deleteComment);
router.put('/:id', commentController.updateComment);

module.exports = router;
