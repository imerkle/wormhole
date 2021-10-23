// run this script with truffle exec

const jsonfile = require("jsonfile");
const TokenBridge = artifacts.require("TokenBridge");
const TokenImplementation = artifacts.require("TokenImplementation");
const BridgeImplementationFullABI = jsonfile.readFileSync("../build/contracts/BridgeImplementation.json").abi

module.exports = async function (callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        const initialized = new web3.eth.Contract(BridgeImplementationFullABI, TokenBridge.address);

        // Register the ONE endpoint
        await initialized.methods.registerChain("0x010000000001009c25379d2a378c78ca61aa58555bad0178a137f1f6f22f2fe3f33fc65fb66e3a34589775eb69279fc6627f1ef13de81696ffac1911ac6bf57003e3476766616a0000000001000000010001000000000000000000000000000000000000000000000000000000000000000400000000044140dd00000000000000000000000000000000000000000000546f6b656e42726964676501000000050000000000000000000000000290fb167208af455bb137780163b7b7a9a10c16").send({
            value: 0,
            from: accounts[0],
            gasLimit: 2000000
        });

        callback();
    }
    catch (e) {
        callback(e);
    }
}

//0x010000000001006e6c929d770fe0461191b0f1073723a3578c7b8920ad8cabb520ed893f6470c74fa5a935addcb06764862e315456dc50819ea75f32cbd33284632ef9ed68affb01000000010000000100010000000000000000000000000000000000000000000000000000000000000004000000000367de6d00000000000000000000000000000000000000000000546f6b656e4272696467650100000005000000000000000000000000432a43fc0cbb1e2d7bdcade743978d1b0cbe5730