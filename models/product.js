import {DataTypes} from "sequelize"
import Campaign from "./campaignCard.js";
import sequelize from "../utils/database.js";

const Products = sequelize.define('productTable', {
  product: {
    type: DataTypes.JSON,
    defaultValue: [] // Default empty array

  },

  campaignId: {  // Corrected spelling
    type: DataTypes.INTEGER,
    references: {
      model: Campaign, 
      key: 'id',
    },
  },

  campaignUniqueId:{
    type: DataTypes.STRING,
    allowNull: true,
  }
}); 

export default Products;