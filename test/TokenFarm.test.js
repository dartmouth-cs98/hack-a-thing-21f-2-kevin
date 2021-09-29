const { assert } = require("chai")
const { Item } = require("react-bootstrap/lib/Breadcrumb")

const DaiToken = artifacts.require("DaiToken")
const DappToken = artifacts.require("DappToken")
const TokenFarm = artifacts.require("TokenFarm")

require("chai")
    .use(require("chai-as-promised"))
    .should()

contract("TokenFarm", (accounts) => {
    describe("Mock Dai deploymnet", async () => {
        it("Has a name", async () => {
            let daiToken = await DaiToken.new()
            const name = await daiToken.name()
            assert.equal(name, "Mock Dai Token")
        })
    })
})