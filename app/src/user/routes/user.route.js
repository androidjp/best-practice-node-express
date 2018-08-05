'use strict';

module.exports = app => {
    app.route('/api/user/login').get((req, res) => {
        res.json({message:'success'});
    })
};