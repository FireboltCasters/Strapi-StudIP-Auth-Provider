const Strapi = require("strapi-sdk-js");
const credentials = require("./credentials.json");

async function main(){

    console.log("Start the login test")

    const strapi = new Strapi({
        url: process.env.STRAPI_URL || "http://localhost:1337",
        store: {
            key: "strapi_jwt",
            useLocalStorage: false,
            cookieOptions: { path: "/" },
        },
        axiosOptions: {},
    })

    try{
        let answer = await strapi.authenticateProvider('myuos', {"username": credentials.username, "password": credentials.password})
        console.log(answer);
    } catch (err){
        console.log(err);
    }
}

main();