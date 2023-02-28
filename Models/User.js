import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt'
// import { maxLoginTries } from '../app.js';
const secret_key = 'DMServices!@#123'
export const maxLoginTries = 5

const UserModel = sequelize => {
  class User extends Model {
    getName = () => {
      return this.firstName + ' ' + this.lastName;
    };
    verifyPassword = pass => {
      return this.password === pass;
    };
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey : true
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : {msg : 'this username is already taken'}
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex :{
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
          isValid : (value)=>{
            if(!['F','M'].includes(value)){
              throw new Error('the sex should be either M or F')
            }
          }
        }
      },
      phone : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : {msg : 'number already taken'},
      },
      country : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      city : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      acceptNewsletters : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false,
      },
      isValidated : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'email already taken' },
        validate: {
          isEmail: {
            msg: 'only good email are accepted',
          },
        },
      },
      loginTryCounter : {
        type : DataTypes.INTEGER,
        defaultValue : maxLoginTries,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isCorrect: value => {
            console.log('value', value)
            if (![0,1,2,3].includes(value)) {
              throw Error(
                'the value of an accessLevel should be either 0 or 1'
              );
            }
          },
        },
      },
      profilePic:{
        type:DataTypes.STRING,
        defaultValue : 'http://localhost:9001/public/images/profile.jpg'
      }
    },
    {
      hooks:{
        afterCreate : (user)=>{
          bcrypt.hash(user.password , 10 , (err , hash)=>{
            user.update({password : hash}).then(usertemp => {
              console.log('user', usertemp.toJSON())
            })
          })
        },
      },
      sequelize,
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    }
  );

  return User;
};

export default UserModel;
