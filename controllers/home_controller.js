module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user-id',100)
    return res.render('home',{
        title : "Home"
    })
}