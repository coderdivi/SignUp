// import React from "react";
// import { google} from "googleapis";
// const clientId =
//   "685879972430-h2gmpp8jh56bs1bo74ll79f3cm1or99a.apps.googleusercontent.com";
// const clientSecret = "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";
// const redirectUrl = "http://localhost:3000";

// function GAuth() {
//   const oauth2Client = new google.auth.OAuth2(
//     clientId,
//     clientSecret,
//     redirectUrl
//   );

//   function generateAuthUrl() {
//     const url = oauth2Client.generateAuthUrl({
//       // 'online' (default) or 'offline' (gets refresh_token)
//       access_type: "offline",
//       // If you only need one scope you can pass it as a string
//       scope: [""],
//     });
//     return url;
//   }
// // **! generates authenticaation url and passes it to window object 
//  async function startAuth(){
// const url = generateAuthUrl()
// window.location.href = url;
//   }

//   async function getToken(code) {
//     // This will provide an object with the access_token and refresh_token.
//     // Save these somewhere safe so they can be used at a later time.
//     // const credSet = await setCreds();
//     // if (!credSet) {
//       const tokenResponse = await oauth2Client.getToken(code);
//       console.log("tokenResponse = ", tokenResponse);
//       if (tokenResponse) {
//         oauth2Client.setCredentials(tokenResponse.tokens);
//       }
//       const accessToken = oauth2Client.credentials.access_token;
//       const refreshToken = oauth2Client.credentials.refresh_token;
//       // console.log('saving creds ...\n', oauth2Client);
//       // await createCredentialsFile();
//       // await saveCredentials(oauth2Client);
//     // }

//     return oauth2Client.credentials.access_token;
//   }

//   let code =""
//   return <div>
//     <button onClick={startAuth}>
//       startAuth
//     </button>

//     <button onClick={()=> getToken(code)}>
// Get Token
//     </button>
//   </div>;
// }

// export default GAuth;
