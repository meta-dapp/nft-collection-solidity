const MetaDappArt = artifacts.require('MetaDappArt')

module.exports = function (deployer) {
    deployer.deploy(MetaDappArt,
        'MetaDappArt',
        'MDAT',
        ''
    )
}