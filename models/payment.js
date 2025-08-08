import {DataTypes} from "sequelize"
import sequelize from "../utils/database.js";
import User from "./user.js";
import Campaign from "./campaignCard.js";

const Payment = sequelize.define('payTable', {
  paymentid: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },

  email:{
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone:{
    type: DataTypes.STRING,
    allowNull: false,
  },

  orderid: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status:{
    type: DataTypes.ENUM('pending', 'success', 'failed'),
    defaultValue: "pending",
  },

  amount: {
    type: DataTypes.INTEGER, 
    allowNull: false  
  },

  paymentMethod: { 
    type: DataTypes.STRING 
  },
  isAnonymous:{
    type: DataTypes.BOOLEAN 
  },
  whatsappUpdates:{
    type: DataTypes.BOOLEAN 
  },

  campignUniqueId:{
    type: DataTypes.STRING,
    allowNull: true
  },

  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: 'id',
    },
  },

  campaignId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Campaign, 
        key: 'id',
      },
    },

  
}); 

export default Payment;