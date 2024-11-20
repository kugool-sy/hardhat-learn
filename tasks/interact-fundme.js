const {task} = require("hardhat/config")

task("interact-fundme", "interact with fundme contract")
    .addParam("addr", "fundme contract address")
    .setAction(async (taskArgs, hre) =>{

    const fundMeFactory = await ethers.getContractFactory("FundMe")
    const fundMe = fundMeFactory.attach(taskArgs.addr)

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

})