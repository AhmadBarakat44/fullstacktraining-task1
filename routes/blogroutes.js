const express = require('express');
const Blog = require ('../models/blog');

const router = express.Router();


router.get('/create',(req,res)=>
{
    res.render('create',{title:'create'});
});

router.get('/',(req,res)=>
{
    Blog.find().sort({createdAt: 1})
    .then((result)=>
    {
        res.render('index',{title: 'HOME', blogs: result});
    });
});

router.post('/',(req,res)=>
{
    const blog = new Blog(req.body);
    blog.save()
    .then(()=>
    {
        res.redirect('/');
    });
});

router.get('/:id',(req,res)=>
{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>
    {
        res.render('details',{blog:result,title:'blog details'});
    })
    .catch((err)=>
    {
        res.status(404).render('404',{title: 'blog not found'});
    });
});

router.delete('/:id',(req,res)=>
{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>
    {
        res.json({redirect:'/blogs'});
    });
});



module.exports = router;