const Dogs = artifacts.require("Dogs");
const DogsUpdated = artifacts.require("DogsUpdated");
const Proxy = artifacts.require("Proxy");

module.exports = async function (deployer, network, accounts) {
    //Deploy contracts
    const dogs = await Dogs.new();
    const proxy = await Proxy.new(dogs.address);

    //Create ProxyDog to fool truffle
    var proxyDog = await Dogs.at(proxy.address);

    //Set the nr of dogs through proxy
    await proxyDog.setNumberOfDogs(10);

    //Tested
    var nrOfDogs = await proxyDog.getNumberOfDogs();
    console.log("Before update: " + nrOfDogs.toNumber());

    //Deploy new version of Dogs
    const dogsUpdated = await DogsUpdated.new();
    proxy.upgrade(dogsUpdated.address)

    //Fool truffle once again to think proxyDog has all functions
    proxyDog = await DogsUpdated.at(proxy.address);
    //Initialize the proxy state 
    proxyDog.initialize(accounts[0]);

    //Check so that storage remains
    nrOfDogs = await proxyDog.getNumberOfDogs();
    console.log("After update: " + nrOfDogs.toNumber())

    //Set the nr of dogs through proxy with new func contract
    await proxyDog.setNumberOfDogs(30);

    //Check so that setNumberOfDogs works with new funcyional contract
    nrOfDogs = await proxyDog.getNumberOfDogs();
    console.log("After Change: " + nrOfDogs.toNumber())
};
