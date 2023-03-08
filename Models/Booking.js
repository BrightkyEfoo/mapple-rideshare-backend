import { DataTypes, Model } from 'sequelize';

const BookingModel
 = sequelize => {
  class Booking extends Model {}
  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey : true
      },
      start : {
        type : DataTypes.STRING
      },
      end : {
        type : DataTypes.STRING,
        allowNull : false
      },
      state : {
        type : DataTypes.INTEGER(2),
        defaultValue : 0
      },
      price : {
        type : DataTypes.FLOAT,
        allowNull : false
      }
    },
    {
      sequelize,
      timestamps: true,
      createdAt: true,
      updatedAt: true,
      onDelete: 'CASCADE',
    }
  );
  return Booking;
};

export default BookingModel;
