const book = require('../models/book');
const User = require('../models/user');
const { Op } = require('../database/sequelize')

exports.createBook = async (req, res) => {
    try {
        const { title, author, published_year, genre } = req.body;
        const added_by = req.user.id;
        const userExists = await User.findByPk(added_by);
        if (!userExists) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const newBook = await book.create({
            title,
            author,
            published_year,
            genre,
            added_by
        });
        res.status(201).json({
            message: 'Book Added Successfully',
            data: newBook
        });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: ' Adding Book Error' + error.message
        })      
    }
}

//get all books by user
exports.getAllBooks = async (req, res) => {
    try {
        const books = await book.findAll({ where: {published_year:{[Op.lt]:2000}}});
        res.status(201).json({
            message: 'All book fetched successfully',
            data: books
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Fetching Books Error' + error.message
        })      
    }
}

//get book by name
exports.getOneBook = async(req, res) => {
    try{
    const { title } = req.params;
    const book = await book.findOne({where: {title: title}});
    if(!book){
        return res.status(404).json({
            message: 'Book not found'
        })
    }
    res.status(200).json({
        message: 'Book fetched successfully',
        data: book
    })

    }catch(error){
        console.error(error.message)
        res.status(500).json({
            message: 'Book not found'
        })
    }
}

//update a book added by user
exports.updatedBook = async(req, res) => {
    try {
        const { title } = req.params;
        const book = await User.findOne({where: {username : username} })
        if(!book){
            return res.status(404).json({
                message: 'Book not found'
            })
        }
        const updatedBook = await book.update(req.body);
        res.status(200).json({
            message: 'Book updated successfully',
            data: updatedBook
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Updating Book Error' + error.message
        })        
        
    }
}

//delete a book added by a user
exports.deleteBook = async(req, res)=>{
    try {
        const { title } = req.params;
        const book = await User.findOne({where: {username : username} })
        if(!book){
            return res.status(404).json({
                message: 'Book not found'
            })
        }
        await book.destroy();
        res.status(200).json({
            message: 'Book deleted successfully'
        })  
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Deleting Book Error' + err.message
        })
        
    }
}