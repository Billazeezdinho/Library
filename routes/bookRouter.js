const router = require('express').Router();
const { createBook, getAllBooks, getOneBook, updatedBook, deleteBook } = require('../controllers/bookController')

router.post('/book/:id', createBook);

router.get('/books', getAllBooks);

router.get('/book/:title', getOneBook);

router.patch('/book/:title', updatedBook);

router.delete('/book/:title', deleteBook);

module.exports = router;