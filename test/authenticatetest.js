const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
chai.should();

chai.use(chaiHttp);

describe('Authentication',()=>{
    it('should perform user authentication and return a JWT Token',(done)=>{
        const user = {
            email : "adithya12@gmail.com",
            password : "adithya12"
        };

        chai.request(server)
        .post("/api/authenticate")
        .send(user)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property("token");
            done();
        });
    },6000);

    it("should not authenticate as it is not a valid user",(done)=>{
        chai.request(server)
        .post("/api/authenticate")
        .send({email:"example1@gmail.com",password:"example1"})
        .end((err,res)=>{
            res.should.have.status(401);
            done();
        });
    },6000);
});