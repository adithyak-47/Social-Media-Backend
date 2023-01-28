const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
chai.should();

chai.use(chaiHttp);

describe("POST /api/follow/{id}",()=>{
    it("should follow a user with id given in the URL params",(done)=>{
        chai.request(server)
        .post("/api/follow/63d29105f336a79d307d4dc3")
        .send({_id:"63ceceaa4fc9cfacf8397af9"})
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        });
    });
});