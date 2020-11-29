const auth_details_seller = {
    ClientId : process.env.REACT_APP_CLIENT_ID, // Your client id here
    AppWebDomain : process.env.REACT_APP_WEB_DOMAIN,
    TokenScopesArray : ['email', 'profile','openid'], // e.g.['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
    RedirectUriSignIn : 'http://localhost:3000/sellerhome',
    RedirectUriSignOut : 'http://localhost:3000/',
    IdentityProvider : 'Facebook', // e.g. 'Facebook',
    UserPoolId : process.env.REACT_APP_USER_POOL_ID, // Your user pool id here
   };
   export default auth_details_seller;