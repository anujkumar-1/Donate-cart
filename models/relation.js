import sequelize from "../utils/database.js";
import User from "./user.js";
import Campaign from "./campaignCard.js";
import Products from "./product.js";
import Otp from "./OTP.js";
import Payment from "./payment.js";

User.hasMany(Campaign, {foreignKey: 'userId'})
Campaign.belongsTo(User, {foreignKey: 'userId'})

Campaign.hasMany(Products, {foreignKey: 'campaignId', onDelete: 'CASCADE'});
Products.belongsTo(Campaign, {foreignKey: 'campaignId'});


User.hasMany(Otp, {foreignKey: "userId"})
Otp.belongsTo(User, {foreignKey: "userId"})


User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });


Campaign.hasMany(Payment, { foreignKey: 'campaignId' });
Payment.belongsTo(Campaign, { foreignKey: 'campaignId' });


export {User, Campaign, Products, sequelize, Otp, Payment};
  