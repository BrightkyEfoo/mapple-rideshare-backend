import { FrontEndView } from '../../Sequelize.js';

const riderLoginForms = [
  {
    language: 'EN',
    name: 'riderloginform',
    content: {
      login: {
        first: {
          title: 'Rider Login',
          inputs: [
            {
              type: 'text',
              title: 'Email',
              placeholder: 'type your email',
            },
            {
              type: 'password',
              title: 'Password',
              placeholder: 'type your password',
            },
          ],
          forgot: {
            title: 'Forgot password ?',
            url: '/forgot-password',
          },
          button: {
            title: 'LOGIN',
          },
          signup: {
            title: 'Or sign up using',
            button: {
              title: 'SIGN UP',
              link: '/sign-up-rider',
            },
          },
        },
        second: {
          title: "What's your code",
          main: {
            title1: 'Please enter the code we are sent on ',
            title2: ' to proceed',
            placeholder: '888888',
            button: 'Resend Code',
          },
          button: {
            title: 'Continue',
          },
        },
      },
      register: {
        first: {
          title: 'Rider Sign Up',
          inputs: [
            {
              type: 'text',
              title: 'Username',
              placeholder: 'type your username',
            },
            {
              type: 'email',
              title: 'Email',
              placeholder: 'type your email',
            },
            {
              type: 'password',
              title: 'Password',
              placeholder: 'type your password',
            },
            {
              type: 'password',
              title: 'Password again',
              placeholder: 're-type your password',
            },
            {
              type: 'text',
              title: 'First name',
              placeholder: 'type your first name',
            },
            {
              type: 'text',
              title: 'Last name',
              placeholder: 'type your last name',
            },
            {
              type: 'radio',
              title: ['Male', 'Female'],
            },
            {
              type: 'phone',
              title: 'Phone number',
            },
            {
              type: 'select',
              title: 'Country',
              values: [
                {
                  title: 'Canada',
                  abbr: 'CA',
                },
                {
                  title: 'USA',
                  abbr: 'US',
                },
              ],
              subTitle: 'City',
            },
            // {
            //   type: 'select',
            //   title : 'City'
            // },
            {
              type: 'checkbox',
              title: 'I agree with terms and conditions',
              name : 'acceptTerms' //this name is only for the web frontend purpose, without this it won't work
            },
            {
              type: 'checkbox',
              title: 'I want to recieve news letters',
              name : 'acceptNewsletters' //this name is only for the web frontend purpose, without this it won't work
            },
          ],
          button: {
            title: 'REGISTER',
          },
        },
        second: {
          title: "What's your code",
          main: {
            title1: 'Please enter the code we are sent on ',
            title2: ' to proceed',
            placeholder: '888888',
            button: 'Resend Code',
          },
          button: {
            title: 'Continue',
          },
        },
      },
    },
  },
  {
    language: 'EN',
    name: 'driverloginform',
    content: {
      login: {
        first: {
          title: 'Driver Login',
          inputs: [
            {
              type: 'text',
              title: 'Email',
              placeholder: 'type your email',
            },
            {
              type: 'password',
              title: 'Password',
              placeholder: 'type your password',
            },
          ],
          forgot: {
            title: 'Forgot password ?',
            url: '/forgot-password',
          },
          button: {
            title: 'LOGIN',
          },
          signup: {
            title: 'Or sign up using',
            button: {
              title: 'SIGN UP',
              link: '/sign-up-rider',
            },
          },
        },
        second: {
          title: "What's your code",
          main: {
            title1: 'Please enter the code we are sent on ',
            title2: ' to proceed',
            placeholder: '888888',
            button: 'Resend Code',
          },
          button: {
            title: 'Continue',
          },
        },
      },
      register: {
        first: {
          title: 'Driver Sign Up',
          inputs: [
            {
              type: 'text',
              title: 'Username',
              placeholder: 'type your username',
            },
            {
              type: 'email',
              title: 'Email',
              placeholder: 'type your email',
            },
            {
              type: 'password',
              title: 'Password',
              placeholder: 'type your password',
            },
            {
              type: 'password',
              title: 'Password again',
              placeholder: 're-type your password',
            },
            {
              type: 'text',
              title: 'First name',
              placeholder: 'type your first name',
            },
            {
              type: 'text',
              title: 'Last name',
              placeholder: 'type your last name',
            },
            {
              type: 'radio',
              title: ['Male', 'Female'],
            },
            {
              type: 'phone',
              title: 'Phone number',
            },
            {
              type: 'select',
              title: 'Country',
              values: [
                {
                  title: 'Canada',
                  abbr: 'CA',
                },
                {
                  title: 'USA',
                  abbr: 'US',
                },
              ],
              subTitle: 'City',
            },
            // {
            //   type: 'select',
            //   title : 'City'
            // },
            {
              type: 'checkbox',
              title: 'I agree with terms and conditions',
              name : 'acceptTerms' //this name is only for the web frontend purpose, without this it won't work
            },
            {
              type: 'checkbox',
              title: 'I want to recieve news letters',
              name : 'acceptNewsletters' //this name is only for the web frontend purpose, without this it won't work
            },
          ],
          button: {
            title: 'REGISTER',
          },
        },
        second: {
          title: "What's your code",
          main: {
            title1: 'Please enter the code we are sent on ',
            title2: ' to proceed',
            placeholder: '888888',
            button: 'Resend Code',
          },
          button: {
            title: 'Continue',
          },
        },
      },
    },
  },
  {
    language: 'EN',
    name: 'createuserform',
    content: {
      register: {
        first: {
          title: 'Create or Update a User',
          inputs: [
            {
              type: 'text',
              title: 'Username',
              placeholder: 'type your username',
            },
            {
              type: 'email',
              title: 'Email',
              placeholder: 'type your email',
            },
            {
              type: 'password',
              title: 'Password',
              placeholder: 'type your password',
            },
            {
              type: 'password',
              title: 'Password again',
              placeholder: 're-type your password',
            },
            {
              type: 'text',
              title: 'First name',
              placeholder: 'type your first name',
            },
            {
              type: 'text',
              title: 'Last name',
              placeholder: 'type your last name',
            },
            {
              type: 'radio',
              title: ['Male', 'Female'],
            },
            {
              type: 'phone',
              title: 'Phone number',
            },
            {
              type: 'select',
              title: 'Country',
              values: [
                {
                  title: 'Canada',
                  abbr: 'CA',
                },
                {
                  title: 'USA',
                  abbr: 'US',
                },
              ],
              subTitle: 'City',
            },
            {
              type: 'checkbox',
              title: 'He want to recieve news letters',
              name : 'acceptNewsletters' //this name is only for the web frontend purpose, without this it won't work
            },
            {
              type: 'number',
              title : 'Access Level',
              name : 'accessLevel'
            }
          ],
          button: {
            title: 'Submit',
          },
        },
      },
    },
  },
];

export const riderLoginFormFiller = () => {
  riderLoginForms.forEach((el, i) => {
    FrontEndView.create(el).then(riderLoginForm => {
      console.log('riderLoginForm ' + i + ' :', riderLoginForm.name);
    });
  });
};
