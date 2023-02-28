import { FrontEndView } from "../../sequelize.js";

const footers = [
  {
    language: 'EN',
    name: 'footer',
    content: {
      top: {
        first: {
          logo: 'http://localhost:9001/public/images/logo.jpeg',
          main: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        },
        second: {
          links: [
            {
              name: 'About',
              url: '/about',
            },
            {
              name: "FAQ's",
              url: '/faq',
            },
            {
              name: 'Terms and Condition',
              url: '/terms-condition',
            },
            {
              name: 'Privacy Policy',
              url: '/privacy',
            },
          ],
        },
        third : {
            title : 'Follow us',
            links : [
                {
                    name : 'facebook',
                    link : 'https://facebook.com'
                },
                {
                    name : 'twitter',
                    link : 'https://twitter.com'
                },
                {
                    name : 'instagram',
                    link : 'https://instagram.com'
                },
                {
                    name : 'youtube',
                    link : 'https://youtube.com'
                },
                {
                    name : 'linkedin',
                    link : 'https://linkedin.com'
                },
            ]
        }
      },
      bottom :{
        left : {
            title : ''
            // span : ''
        },
        right : {
            title : '© 2021. Maple Ride. All rights Reserved.'
        }
      }
    },
  },
];


export const FooterFiller = ()=>{
    footers.map((el , i) => {
        FrontEndView.create({...el}).then(footer => {
          console.log(`footer ${i} : ${footer.name}`)
        }).catch(err => console.log('err', err))
      })
}