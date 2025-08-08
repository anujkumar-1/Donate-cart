import {DataTypes} from "sequelize"
import sequelize from "../utils/database.js";
import User from "./user.js";


const Otp = sequelize.define('otpTable', {
  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    unique: true
  },

  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: 'id',
    }}

}); 

export default Otp;