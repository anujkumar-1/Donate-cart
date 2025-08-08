import { Sequelize} from "sequelize"

const sequelize = new Sequelize('donatedb', 'root', 'Anujkumar@1', {
    host: 'localhost',
    dialect: "mysql"
});

export default sequelize;