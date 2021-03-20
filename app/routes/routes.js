const Sample = require('../models/sample')

module.exports = (app) => {

    app.get('/api/show', function(req, res) {
        Sample.find(function(err, samples) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            console.log('samples', samples);
            res.status(200);
            res.json(samples);
        });
    });

    app.post('/api/insert', function(req, res) {
        let rec = new Sample(req.body);
        let regexEmail = /([\w\.]+)@([\w\.]+)\.(\w+)/;
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if((!(rec.userEmail.trim().match(regexEmail))) || (!(rec.userPassword.trim().match(strongRegex)))){
            res.send({
                message : "Email and Password are not valid"
            })
        }else{
            rec.save(function(err, n) {
                if (err)
                    console.log('saving failed');
                console.log('saved ' + n.message);
                res.status(201)
                res.json(n);
            });
        }
    });

    app.put('/api/update/:id', function(req,res){

        const userId = req.params.id;
        const userBody = req.body;
        userBody._id = userId
        console.log(userBody ,"userbodyyyyy");
        let regexEmail = /([\w\.]+)@([\w\.]+)\.(\w+)/;
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if((!(userBody.userEmail.trim().match(regexEmail))) || (!(userBody.userPassword.trim().match(strongRegex)))){
            res.send({
                message : "Email and password are not valid"
            })
        }else{
            Sample.findOneAndUpdate({
                _id : userId
            },{
                userEmail : userBody.userEmail,
                userPassword : userBody.userPassword
            },function(err,n){
                if(err){
                    console.log("updation failed")
                }else{
                    res.status(200)
                    res.send({
                        message : "User Updated"
                    })
                }
            })
        }
    })

    app.delete('/api/delete/:password', function(req,res){
        const password = req.params.password;
        Sample.findOneAndDelete({
            userPassword : password
        },function(err,n){
            if(err){
                console.log("Deletion failed")
            }else{
                res.status(200)
                res.send({
                    message : "User Deleted"
                })
            }
        })
    })

    
}