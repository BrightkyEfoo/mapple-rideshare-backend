import { DataTypes, Model } from 'sequelize';

const FrontEndViewModel = sequelize => {
  class FrontEndView extends Model {}
  FrontEndView.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey : true
      },
      language : {
        type : DataTypes.STRING
      },
      name : {
        type : DataTypes.STRING,
        allowNull : false
      },
      content : {
        type : DataTypes.JSON
      }
    },
    {
      sequelize,
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    }
  );
  return FrontEndView;
};

export default FrontEndViewModel;
