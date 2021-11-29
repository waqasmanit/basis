const mongoose = require('mongoose');
const Post = require('../models/postModel')

exports.createPost =  async (req,res)=> {
    const { title , content } = req.body;
    
    console.log('post creation', content)
    if(content !== undefined && title !== undefined) {
     const newPost = await Post.create({title,content})
     res.status(200).json({
        message: 'Post Creation Successfull'
     })
    } else  res.status(400).json({
        message: 'Some error Ocurred'
     })
  }

  exports.addComment =  async (req,res)=> {
    const { id , comment } = req.body;
    
  }
  exports.addLike =  async (req,res)=> {
    
  }

  exports.getComments =  async (req,res)=> {
    
  }

  exports.deletePost =  async (req,res)=> {

  }