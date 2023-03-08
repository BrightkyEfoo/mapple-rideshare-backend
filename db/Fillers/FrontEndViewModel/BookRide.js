import { FrontEndView } from "../../Sequelize.js";

const bookrides = [
  {
    language: 'EN',
    name: 'bookride',
    content: {
      part1: {
        title: 'Book Ride',
        inputs: [
          {
            label: 'Start location',
            type: 'text',
            name : 'start',
            placeholder: 'Enter location',
          },
          {
            label: 'End location',
            name : 'end',
            type: 'text',
            placeholder: 'Enter location',
          },
        ],
        button: {
          value: 'Find',
          action: '',
        },
      },
      part2: {
        cardsButton: {
          value: 'Book Now',
          action: '',
        },
      },
      part3: {
        title: 'Review',
        areas: [
          {
            title: 'Vehicle number',
          },
          {
            title: 'Fare amount',
          },
        ],
        main: 'Please note that once you confirm the booking, you will be able to contact the driver and confirm the pickup.',
        button: {
          value: 'Confirm Booking',
          action: '',
        },
      },
      part4: {
        title: 'Booking Successful',
        button: {
          value: 'View on My Booking',
          action: '',
        },
      },
      part5: {
        title: 'Ride Details',
        topButton: {
          value: 'Call',
          action: '',
        },
        buttons: [
          {
            value: 'Ride Start',
            action: '',
          },
          {
            value: 'Cancel Ride',
            action: '',
          },
        ],
      },
      part6 : {
        title : 'Ride',
        button : {
          value : 'Complete Ride',
          action : ''
        }
      }
    },
  },
];


export const BookRideFiller = ()=>{
  bookrides.forEach((el,i)=>{
    FrontEndView.create({...el}).then(bookride => {
      console.log(`bookride ${i} : ${bookride.name}`)
    }).catch(err => console.log('err', err))
  })
}


