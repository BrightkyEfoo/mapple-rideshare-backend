import { FrontEndView } from "../../Sequelize.js";

const AdminLoginForms = [
  {
    language: 'EN',
    name: 'adminloginform',
    content: {
      logo: 'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/public/images/logo.jpeg',
      title: 'Maple RideShare',
      inputs: [
        {
          type: 'email',
          label : 'Email',
          placeholder: 'Enter your email',
        },
        {
          label : 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      ],
      button: {
        link: '/maple-ride-admin',
        value: 'Login',
      },
      forgot: {
        value: 'Forgot your password ?',
        link: '/forgot-password',
      },
      footer: {
        title: '© 2021. Maple Ride. All rights Reserved.',
      },
    },
  },
];

const subAdminLoginForms = [
  {
    language: 'EN',
    name: 'subadminloginform',
    content: {
      logo: 'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/public/images/logo.jpeg',
      title: 'Maple RideShare',
      inputs: [
        {
          label : 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        {
          label : 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      ],
      button: {
        link: '/maple-ride-admin',
        value: 'Login',
      },
      forgot: {
        value: 'Forgot your password ?',
        link: '/forgot-password',
      },
      footer: {
        title: '© 2021. Maple Ride. All rights Reserved.',
      },
    },
  },
];

export const AdminLoginFormsFiller = () => {
  AdminLoginForms.map((el, i) => {
    FrontEndView.create({ ...el })
      .then(AdminLoginForm => {
        console.log(`AdminLoginForms ${i} : ${AdminLoginForm.name}`);
      })
      .catch(err => console.log('err', err));
  });
  subAdminLoginForms.map((el, i) => {
    FrontEndView.create({ ...el })
      .then(subAdminLoginForm => {
        console.log(`subAdminLoginForm ${i} : ${subAdminLoginForm.name}`);
      })
      .catch(err => console.log('err', err));
  });
};
