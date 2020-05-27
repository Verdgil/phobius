let express = require('express');
let router = express.Router();
let db = require("./../utils/db");

function randomInteger(max) {
    let rand = -0.5 + Math.random() * (max + 1);
    rand = Math.round(rand);
    return rand;
}

Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
        let num = Math.floor(Math.random() * (i + 1));
        let d = this[num];
        this[num] = this[i];
        this[i] = d;
    }
    return this;
};

/* GET home page. */
router.get('/', function(req, res, next) {
    let need = randomInteger(db.length - 1);
    var mas = [need];
    while(mas.length < 4) {
        let new_rand = randomInteger(db.length);
        if(new_rand !== need)
            mas.push(new_rand);
    }
    mas.shuffle();
    res.render('index', {
        title: 'Угадай фобию',
        name: db[need]["name"] + " это - ?",
        desc0: db[mas[0]]["description"],
        desc1: db[mas[1]]["description"],
        desc2: db[mas[2]]["description"],
        desc3: db[mas[3]]["description"],
        anw: mas.indexOf(need)
    });
});

module.exports = router;
