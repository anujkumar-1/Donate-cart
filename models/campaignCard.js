import {DataTypes} from "sequelize"
import sequelize from "../utils/database.js";
import User from "./user.js";

const Campaign = sequelize.define('campaignTable', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  campaignUniqueId:{
    type: DataTypes.STRING,
  },
  nameOfBeneficiary: {
    type: DataTypes.STRING,
  },
  typeOfTheCampaign: {
    type: DataTypes.STRING,
  },
  emailOfTheCampaigner:{
    type: DataTypes.STRING,
    allowNull: false
  },

  mobileOftheBeneficiary:{
    type: DataTypes.STRING,
  },
  stateOfTheBeneficiary: {
    type: DataTypes.STRING,
  },
  cityOfTheBeneficiary: {
    type: DataTypes.STRING,
  },
  campaignTitle:{
    type: DataTypes.STRING,
  },
  campaignImgLink:{
    type: DataTypes.TEXT,
  },
  campaignDescription:{
    type: DataTypes.TEXT,
  },
  campaignGoalAmount:{
    type: DataTypes.INTEGER
  },
  amountRaised:{
    type: DataTypes.INTEGER,

  },
  backerCount:{
    type: DataTypes.INTEGER,
  },
  
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: 'id',
    },
  },
  status:{
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: "pending", 
  } 


}); 

export default Campaign;