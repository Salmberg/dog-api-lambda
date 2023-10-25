const {sendResponse} = require('./responses/index');
const {postDog} = require('./functions/postDog');
const {getDogById} = require('./functions/getDogById');

var dogs = [
    { id: 1, name: "Fido", age: 2, breed: "Chihuahua" },
    { id: 2, name: "Snoop", age: 8, breed: "Bulldog" },
    { id: 3, name: "Rex", age: 4, breed: "Labrador" }
]





exports.handler = async (event, context) => {

    const { method, path } = event.requestContext.http;


    if (method === "GET" && path === "/dogs") {
        return sendResponse(200, { dogs });

    } else if (method === "GET" && path.startsWith("/dogs/")) {
        const id = path.split("/dogs/")[1];
        
        return getDogById(dogs, id);
      
    }


    else if (method === "POST" && path === "/dogs") {
        const body = JSON.parse(event.body);

       return postDog(dogs, body);

    }

    return sendResponse(404, { message: "ERROR" });

}