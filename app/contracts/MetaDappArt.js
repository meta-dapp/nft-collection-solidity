import MetaDappArt from './MetaDappArt.json'
import contract from 'truffle-contract'

export default async (provider) => {
    const metaDappArt = contract(MetaDappArt)
    metaDappArt.setProvider(provider)
    var instance = await metaDappArt.deployed()
    return instance
}