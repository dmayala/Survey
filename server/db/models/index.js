import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL);
const db = {};

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach((file) => {
        let model = sequelize.import(path.join(__dirname, file));
        if (model instanceof Array) {
            model.forEach(function(m) {
                db[m.name] = m;
            });
        } else {
            db[model.name] = model;
        }
    });

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

export default lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);
