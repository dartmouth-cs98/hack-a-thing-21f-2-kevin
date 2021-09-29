const { assert } = require("chai")
const { Item } = require("react-bootstrap/lib/Breadcrumb")
const { default: Web3 } = require("web3")

const DaiToken = artifacts.require("DaiToken")
const DappToken = artifacts.require("DappToken")
const TokenFarm = artifacts.require("TokenFarm")

require("chai")
    .use(require("chai-as-promised"))
    .should()

function tokens(n) {
    return Web3.utils.toWei(n, 'ether');
}

contract("TokenFarm", ([owner, investor]) => {
    let daiToken, dappToken, tokenForm

    before(async () => {
        // Load contracts
        let daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenForm = await TokenFarm.new(dappToken.address, daiToken.address)

        // Transfer all Dapp tokens to farm
        await dappToken.transfer(tokenFarm.address, tokens('1000000'))

        // Transfer tokens to investor
        await daiToken.transfer(investor, tokens('100'), { from: owner })
    })

    describe("Mock DAI deploymnet", async () => {
        it("Has a name", async () => {
            let daiToken = await DaiToken.new()
            const name = await daiToken.name()
            assert.equal(name, "Mock DAI Token")
        })
    })

    describe("Dapp Token deploymnet", async () => {
        it("Has a name", async () => {
            let dappToken = await DappToken.new()
            const name = await dappToken.name()
            assert.equal(name, "DApp Token")
        })
    })

    describe("Token Farm deploymnet", async () => {
        it("Has a name", async () => {
            let tokenFarm = await TokenFarm.new()
            const name = await TokenFarm .name()
            assert.equal(name, "Dapp Token Farm")
        })
    })

    it('contract has tokens', async () => {
        let balance = await dappToken.balanceOf(tokenFarm.address)
        assert.equal(balance.toString(), tokens("1000000"))
    })
})

describe('Farming tokens', async () => {
    it('rewards investors for staking mDai tokens', async () => {
        let result
        // Check investor balance
        result = await daiToken.balanceOf(investor)
        assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')

        // Stake DAI tokens
        await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor })
        await tokenFarm.stakeTokens(tokens('100'), { from: investor })
        // Check staking result
        result = await daiToken.balanceOf(investor)
        assert.equal(result.toString(), tokens('0'), 'investor DAI wallet balance correct after staking')

        result = await daiToken.balanceOf(tokenFarm.address)
        assert.equal(result.toString(), tokens('1000'), 'TokenFarm DAI wallet balance correct after staking')

        result = await tokenFarm.isStaking(investor)
        assert.equal(result.toString(), 'true', 'investoer staking status correct after staking')
    })
})