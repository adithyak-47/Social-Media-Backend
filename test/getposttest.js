const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
chai.should();

chai.use(chaiHttp);

describe("GET /api/posts/{id}",()=>{
    it("should return a post with its number of likes and comments",(done)=>{
        chai.request(server)
        .get("/api/posts/63d2c3d02ab6d25aac8ea37e")
        .end((err,res)=>{
            res.should.have.status(200);
            res.should.be.a.json;
            done();
        })
    })
})