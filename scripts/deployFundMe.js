//import ethers from "hardhat
const { ethers } = require("hardhat")


async function main() {
    const fundMeFactory = await ethers.getContractFactory("FundMe")
    console.log("contract deploying")
    const fundMe = await fundMeFactory.deploy(300)
    
    await fundMe.waitForDeployment()
    console.log("Contract has been deployed success: " + fundMe.target)

    if (hre.network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
        console.log("Waiting for 5 confirmations")
        await fundMe.deploymentTransaction().wait(5)
        await verifyFundMe(fundMe.target, [300])
    }else{
        console.log("verification skipped...")
    }

    const [firstAccount, secondAccount] = await ethers.getSigners()

    const fundTx = await fundMe.fund({value:ethers.parseEther("0.5")})
    await fundTx.wait()

    const balanceOfConatract = await ethers.provider.getBalance(fundMe.target)
    console.log("balance of the contract: " + balanceOfConatract)


    const fundTxWithSecondAccount = await fundMe.connect(secondAccount.address).fund({value:ethers.parseEther("0.00000000000000001")})
    await fundTxWithSecondAccount.wait()

    const balanceOfConatractAfterSecondFund = await ethers.provider.getBalance(fundMe.target)
    console.log("balance of the contract: " + balanceOfConatractAfterSecondFund)

    const firstAccountBalanceInFundMe = await fundMe.fundersToAmount(firstAccount.address)
    const secondAccountBalanceInFundMe = await fundMe.fundersToAmount(secondAccount.address)
    console.log(`balance of first account ${firstAccount.address} is ${firstAccountBalanceInFundMe}`)
    console.log(`balance of second account ${secondAccount.address} is ${secondAccountBalanceInFundMe}`)

}   


async function verifyFundMe(fundAddr, args) {
    await hre.run("verify:verify",{
        address: fundAddr,
        constructorArguments: args,
    })
}

main().then().catch((err) => {console.log(err)})