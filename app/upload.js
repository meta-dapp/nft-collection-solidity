require('dotenv').config()
const fs = require('fs')
const pinataSDK = require('@pinata/sdk')
const path = require('path')
const pinata = pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET
)

const sleep = (timeMs) => new Promise(resolve => setTimeout(resolve, timeMs))

uploadIPFS = async () => {
    const size = fs.readdirSync('./images').length
    for (var i = 1; i <= size; i++) {
        console.log('Saving image...')
        var readableStream = fs.createReadStream(`./images/${i}.png`)
        const image = await pinata.pinFileToIPFS(readableStream)
        const metaData = generateMetaData(image.IpfsHash, i)
        console.log('Saving metadata...')
        fs.writeFileSync(`./metadata/${i}.json`, JSON.stringify(metaData))
        await sleep(2000)
    }

    const metaDataPath = path.resolve(`${__dirname}/metadata`)
    const metaData = await pinata.pinFromFS(metaDataPath)
    const tokenUriBase = `https://gateway.pinata.cloud/ipfs/${metaData.IpfsHash}/`
    console.log(tokenUriBase)
}

generateMetaData = (imagePath, itemId) => {
    return {
        name: `MDAT Collection: Image ${itemId}`,
        description: `MetaDappArt Collection: Image Description for ${itemId}`,
        image: `https://gateway.pinata.cloud/ipfs/${imagePath}`,
    }
}

uploadIPFS()