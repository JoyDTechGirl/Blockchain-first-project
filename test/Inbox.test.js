const ganache = require("ganache");
const { Web3 } = require("web3");
const assert = require("assert");
// updated ganache and web3 imports added for convenience
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");
// contract test code will go here

let accounts;
let inbox;

beforeEach(async () => {
  // Get a List of account using promise
  // web3.eth.getAccounts().then(fetchedAccounts => {
  //   console.log(fetchedAccounts);
  // });

  // Get a list of account using the async/await
  accounts = await web3.eth.getAccounts();
  // use one of the account to deploy the contract

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hello There"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hello There");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "bye");
  });
});

// class Car {
//   park(){
//     return 'Stopped'
//   }
//   drive(){
//     return 'Vroom'
//   }
// }

// let car;

// beforeEach(() => {
//   car = new Car();
// })

// describe('Car', () => {
//   it('can park', () => {
//     assert.equal(car.park(),'Stopped');
//   });

//   it('can drive',() => {
//     assert.equal(car.drive(),'Vroom')
//   });
// });
