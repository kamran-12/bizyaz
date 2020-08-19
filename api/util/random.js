const crypto = require("crypto")

//console.log(crypto.randomBytes(32).toString('hex'))

function getRandomInt(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

exports.fileName = original_name => {
    result_of_random = crypto.randomBytes(16).toString('hex');
    var extension = original_name.split('.').pop().toLowerCase();
    return result_of_random + '.' + extension;
}

exports.randomString = function(min, max){
    var symbols = 'ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz                                    '
    var ni = symbols.length
    var nr = getRandomInt(min, max)
    var out = '';
    for (var i = 0; i < nr; i++){
        out += symbols[getRandomInt(0,ni)]
    }
    var a='zuck me'
    console.log(a)
    return out.trim();
}

exports.randomDate = function(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}