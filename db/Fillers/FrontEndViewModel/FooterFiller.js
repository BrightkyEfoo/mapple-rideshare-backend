import { FrontEndView } from "../../Sequelize.js";

const footers = [
  {
    language: 'EN',
    name: 'footer',
    content: {
      top: {
        first: {
          logo: 'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/public/images/logo.jpeg',
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
            title : '© 2022. Maple Rideshare. All rights Reserved.'
        }
      }
    },
  },
  {
    language : 'EN',
    name : 'footer2',
    content : {
      logo : 'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/public/images/logo.jpeg',
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
      title : '© 2022. Maple Rideshare. All rights Reserved.'
    }
  }
];


export const FooterFiller = ()=>{
    footers.map((el , i) => {
        FrontEndView.create({...el}).then(footer => {
          console.log(`footer ${i} : ${footer.name}`)
        }).catch(err => console.log('err', err))
      })
}