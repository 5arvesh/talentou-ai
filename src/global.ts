const hostName = window.location.hostname;
let endPoint = "https://piqualai-api-dev.ignithocloud.com/api/v1";
let sitekey = "6LdoR20rAAAAAFaSzs1xajYv8HM7UNNoGwLK87wd";
let appUrl = 'https://app.piqual.ai';
let appEnv = 'PROD'
if (hostName === "localhost") {
    endPoint = "http://localhost:5555/api/v1";
    // endPoint = "https://piqualai-api-dev.ignithocloud.com/api/v1";
    sitekey ="6Lf4V24rAAAAAINkb0JUNMPPf7UxjDtukl06gye-";
}
if (hostName === "localhost" || "dev.piqual.ai") {
  appEnv = "DEV";
//   appUrl = "https://dev.piqual.ai";
}
export const API = endPoint;
export const siteKey= sitekey;
export const APPUrl = appUrl;
export const appEnvironment = appEnv;
//export const DOMAIN = https://idadev-api.ignithocloud.com
// export const API = "https://idadev-api.ignithocloud.com/api/v1";
