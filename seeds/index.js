const seedCategories = require('./category_seeds');
const seedProducts = require('./product_seeds');
const seedTags = require('./tag_seeds');
const seedProductTags = require('./product_tags');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({force:true});
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');
    await seedProducts();
    console.log('\n----- PRODUCTS SEEDED -----\n');
    await seedTags();
    console.log('\n----- TAGS SEEDED -----\n');
    await seedProductTags();
    console.log('\n----- PRODUCT TAGS SEEDED -----\n');

    process.exit(0);
}

seedAll();