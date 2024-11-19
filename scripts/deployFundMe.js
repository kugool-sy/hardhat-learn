//import ethers from "hardhat
const { ethers } = require("hardhat")


async function main() {
    const fundMeFactory = await ethers.getContractFactory("FundMe")
    const fundMe = await fundMeFactory.deploy(10)
    fundMe.waitForDeployment()
    console.log("Contract has been deployed success: " + fundMe.target)
}

main().then().catch((err) => {console.log(err)})