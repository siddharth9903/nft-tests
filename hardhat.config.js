require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity : "0.8.20",
  // solidity: {
  //   compilers: [
  //     {
  //       version: "0.8.0",
  //     },
  //     {
  //       version: "0.8.19",
  //     },
  //   ],
  //   overrides:{
  //     "contracts/Quantumk9s.sol":{
  //       version: "0.8.19"
  //     },
  //     "contracts/Token.sol": {
  //       version: "0.8.19"
  //     }
  //   }
  // },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // default Ganache UI endpoint
    },
  },
};
