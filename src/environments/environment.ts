// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    firebase : {
    apiKey: "AIzaSyDRhEgNleV2oXekeIxHd9fCfAwtlefAcEk",
    authDomain: "nutraltest.firebaseapp.com",
    databaseURL: "https://nutraltest.firebaseio.com",
    projectId: "nutraltest",
    storageBucket: "nutraltest.appspot.com",
    messagingSenderId: "574418147348"
  },
   nutralMix:{
     SQL_SERVER:'https://us-central1-nutraltest.cloudfunctions.net/'  //Desarrollo
   }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
