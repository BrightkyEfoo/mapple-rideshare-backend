import { FrontEndView } from "../../Sequelize.js";

const navBars = [
  {
    language: 'EN',
    name: 'navbar',
    content: {
      logo: 'http://localhost:9001/public/images/logo.jpeg',
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
];


export const navBarFiller = ()=>{
    navBars.map((el , i) => {
      FrontEndView.create({...el}).then(navbar => {
        console.log(`navbar ${i} : ${navbar.name}`)
      }).catch(err => console.log('err', err))
    })
}