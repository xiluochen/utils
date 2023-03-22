const fs = require('fs');
const { jsonFilePath } = require('../config/appConfig');

function generateData(req, res, next){
    req.jsonDB = {
        read(){
            this.data = JSON.parse(fs.readFileSync(jsonFilePath))
        },
        get(collection){
            return this.data[collection].sort((a,b)=>(a.id-b.id));
        },
        write(){
            fs.writeFileSync(jsonFilePath, JSON.stringify({...this.data}));
        }
    };
    req.jsonDB.read();
    next();
}

module.exports = generateData;