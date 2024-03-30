export const corsPolicy=(req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001"); // Update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}