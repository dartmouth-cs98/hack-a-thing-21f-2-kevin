const TokenFarm = artifacts.require("TokenFarm");

import "./DappToken.sol";
import "./DaiToken.sol";

module.exports = function(deployer) {
    deployer.deploy(TokenFarm);

    constructor() {
        
    }
}