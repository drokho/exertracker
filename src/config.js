const prod = {
    url: {
        API_URL: process.env.REACT_APP_PROD_URL
   }
}
const dev = {
    url: {
        API_URL: process.env.REACT_APP_DEV_URL
    }
};

   export const config = process.env.NODE_ENV === 'development' ? dev : prod;