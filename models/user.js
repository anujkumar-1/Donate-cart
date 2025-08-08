import {DataTypes} from "sequelize"
import sequelize from "../utils/database.js";


const User = sequelize.define('userTable', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  mobile:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  isAdmin: {
      type: DataTypes.ENUM("user", "admin"), // Restrict values
      defaultValue: "user", // Default is "user"
      allowNull: true
  }
}); 

export default User;