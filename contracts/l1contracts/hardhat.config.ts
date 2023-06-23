import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-vyper";
import "hardhat-storage-layout"

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  vyper: {
    version: "0.3.1",
  },
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: "https://thrumming-wiser-wind.ethereum-goerli.discover.quiknode.pro/c04504dec720c90cd6d6f952254cccbe44923a62/",
      accounts: ["02523a7b48f34cc101c4eaa7fe236e930024f916197629d8f0066c94e6d0004d"]
    }
  }

};


export default config;
