const path = require('path')
const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
    plugins: [
        'truffle-plugin-verify'
    ],
    api_keys: {
        etherscan: 'tu_apikey_etherscan'
    },
    contracts_build_directory: path.join(__dirname, "app/contracts"),
    networks: {
        rinkeby: {
            provider: () => new HDWalletProvider(
                'frase secreta aquí',
                `https://rinkeby.infura.io/v3/tu_apikey_de_infura`, 0),
            from: "tu_dirreccion_metamask",
            gas: "4500000",
            gasPrice: "10000000000",
            network_id: 4,
            confirmations: 4,
            timeoutBlocks: 10000,
            skipDryRun: true
        },
    },
    compilers: {
        solc: {
            version: "0.8.9"
        }
    }
}