const {task} = require("hardhat/config")

task("deploy-fundme", "deploy and verify fundme contract").setAction(async (taskArgs, hre) =>{
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
})

async function verifyFundMe(fundAddr, args) {
    await hre.run("verify:verify",{
        address: fundAddr,
        constructorArguments: args,
    })
}