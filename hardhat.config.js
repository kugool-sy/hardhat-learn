require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config()
require("@chainlink/env-enc").config()


const SEPOLIA_URL = process.env.SEPOLIA_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",//可以不写，因为hardhat默认就是hardhat，但是写上也可以改为其他网络
    solidity: "0.8.27",
    networks:{
        sepolia:{
            url:SEPOLIA_URL,
            accounts:[PRIVATE_KEY]
        },
        localhost:{
        },
    }
};
