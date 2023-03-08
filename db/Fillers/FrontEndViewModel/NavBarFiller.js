import { FrontEndView } from "../../Sequelize.js";

const navBars = [
  {
    language: 'EN',
    name: 'navbar',
    content: {
      logo: 'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/public/images/logo.jpeg',
      links: [
        {
          name: 'Home',
          url: '/',
        },
        {
          name: 'About',
          url: '/about',
        },
        {
          name: "FAQ's",
          url: '/faq',
        },
        {
          name: 'Support',
          url: '/support',
        },
      ],
      buttons: [
        {
          name: 'Rider Login',
        },
        {
          name: 'Driver Login',
        },
      ],
    },
  },
  {
    language : 'EN',
    name : 'navbar2',
    content : {
      logo : 'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/public/images/logo.jpeg',
      buttons : {
        isDriver : 'switch to rider',
        isRider : 'switch to driver'
      }
    }
  }
];


export const navBarFiller = ()=>{
    navBars.map((el , i) => {
      FrontEndView.create({...el}).then(navbar => {
        console.log(`navbar ${i} : ${navbar.name}`)
      }).catch(err => console.log('err', err))
    })
}