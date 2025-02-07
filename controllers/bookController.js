const book = require('../models/book');
const User = require('../models/user');
const { Op } = require('../database/sequelize');
const { v4 :uuid } = require('uuid');

exports.createBook = async (req, res) => {
    try {
        const { title, author, published_year, genre  } = req.body;
        const newBook = await book.create({
            id: uuid(),
            title,
            author,
            published_year,
            genre,
            added_by:req.params.id
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
        // console.log(books);
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
    const oneBook = await book.findOne({where: {title: title}});
    if(!oneBook){
        return res.status(404).json({
            // message: 'Book not found'
        })
    }
    res.status(200).json({
        message: 'Book fetched successfully',
        data: oneBook
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
        const { added_by } = req.params.id;
        const { title, author, published_year, genre } = req.body;
        const book = await User.findOne({where: { added_by : added_by} })
        if(!book){
            return res.status(404).json({
                message: 'Book not found'
            })
        }else{
            const data = {
                title,
                author,
                published_year,
                genre,
            };
            //update the data to the database
            await User.update(data, {where: { added_by: added_by } });
            // Fetching that book to see the changes made
            const updatedBook = await book.findAll({ where: { added: added_by } });
            
            //send a success response
            res.status(200).json({
                message: 'Book updated successfully',
                data: updatedBook
            })
        }
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
        const book = await User.findOne({where: { title : title} })
        if(book.length == 0 ){
            return res.status(404).json({
                message: 'Book not found'
            })
        }else{
        await book.destroy({where: {title : title}});
        res.status(200).json({
            message: 'Book deleted successfully'
        })  
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Deleting Book Error' + err.message
        })
        
    }
}


