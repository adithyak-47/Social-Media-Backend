const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
chai.should();

chai.use(chaiHttp);

describe("/api/unfollow/{id}",()=>{
    it("should throw error as user is unfollowed already",(done)=>{
        chai.request(server)
        .post("/api/unfollow/63d290c0f336a79d307d4dc2")
        .send({_id:"63ceceaa4fc9cfacf8397af9"})
        .end((err,res)=>{
            res.should.have.status(404);
            done();
        });
    });
});