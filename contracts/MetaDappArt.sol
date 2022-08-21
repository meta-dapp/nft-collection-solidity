// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MetaDappArt is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 private maxSupply = 5;
    uint256 private price = 2 * 10 **16; // 0.02 ETH
    string private tokenURIBase;

    constructor(string memory _name, string memory _symbol, string memory _tokenURIBase) ERC721(_name, _symbol){
        tokenURIBase = _tokenURIBase;
    }

    function mintNFT(string memory _tokenURI) public payable returns(uint256){
        require(_tokenIds.current() < maxSupply, "Max reached");
        require(price == msg.value, "Need ETH to mint");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_msgSender(), newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }

     function mintNFT() public payable returns(uint256){
        require(_tokenIds.current() < maxSupply, "Max reached");
        require(price == msg.value, "Need ETH to mint");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_msgSender(), newItemId);
        _setTokenURI(newItemId, tokenURI(newItemId));

        return newItemId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);
        return bytes(tokenURIBase).length > 0 
                    ? string(abi.encodePacked(string(abi.encodePacked(tokenURIBase, Strings.toString(tokenId))), ".json")) : "";
    }

    function totalSupply() public view returns(uint256) {
        return maxSupply;
    }

    function withdraw(address payable account) external onlyOwner {
        (bool success, ) = account.call{value: address(this).balance}("");
        require(success);
    }

    receive() external payable {}
    fallback() external payable {}
}