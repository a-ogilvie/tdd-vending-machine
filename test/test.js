const VendingMachine = require("../VendingMachine");
const inventory = require("../inventory");
const { expect } = require("chai");
let machine;

describe("vending machine", () => {
  beforeEach(() => {
    machine = new VendingMachine(inventory);
  });

  it("should import the inventory correctly", () => {
    // Assert
    expect(machine.inventory).to.deep.equal(inventory);
  });

  it("should accept valid coins", () => {
    // Exercise
    machine.insertCoin(500);

    // Assert
    expect(machine.till).to.deep.equal({
      10: 0,
      50: 0,
      100: 0,
      500: 1,
    });
    expect(machine.balance).to.equal(500); // Use an ES6 getter
  });

  it("should reject non-existent coins", () => {
    // Exercise
    machine.insertCoin(13);

    // Assert
    expect(machine.till).to.deep.equal({
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    });
    expect(machine.balance).to.equal(0);
  });

  it("should accept a letter A-D as a row selection when no row is selected", () => {
    // Exercise
    machine.pressButton("A");

    // Assert
    expect(machine._console[0]).to.equal("A");
  });

  it("should reject a number when no row is selected", () => {
    // Exercise
    machine.pressButton(1);

    // Assert
    expect(machine.selection.row).to.be.undefined;
    expect(machine.selection.column).to.be.undefined;
  });

  it("should display the item name", () => {
    // Exercise
    machine.pressButton(1);

    // Assert
    expect(machine.selection.row).to.be.undefined;
    expect(machine.selection.column).to.be.undefined;
  });

  it("should decrease by 1", () => {
    // Exercise
    machine.insertCoin(100);
    machine.insertCoin(50);
    machine.pressButton("A");
    machine.pressButton(1);

    // Assert
    expect(machine.inventory[0][0].count).to.equal(4);
  });

  it("should return the correct change", () => {
    // Exercise
    machine.insertCoin(500);
    machine.insertCoin(500);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.pressButton("A");
    //machine.pressButton(4);

    // Assert
    expect(machine.pressButton(4)).to.equal(200);
  });

  it("should log the correct change denominations", () => {
    // Setup
    const expectedChange = {
      10: 0,
      50: 0,
      100: 2,
      500: 0,
    };

    // Exercise
    machine.insertCoin(500);
    machine.insertCoin(500);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.pressButton("A");
    machine.pressButton(4);

    // Assert
    expect(machine._console[3]).to.deep.equal(expectedChange);
  });

  it("should give an error if no change is available", () => {
    // Exercise
    machine.insertCoin(500);
    machine.insertCoin(500);
    machine.insertCoin(500);
    machine.pressButton("A");
    machine.pressButton(1);

    // Assert
    expect(machine._console[3]).to.equal("No change available.");
  });

  it("should reinitalise after vending", () => {
    // Exercise
    machine.insertCoin(500);
    machine.insertCoin(500);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.pressButton("A");
    machine.pressButton(4);

    // Assert
    expect(machine.selection.row).to.be.undefined;
    expect(machine.selection.column).to.be.undefined;
  });

  it("should dispay warning if not enough coins inserted", () => {
    // Exercise
    machine.insertCoin(500);
    machine.pressButton("B");
    machine.pressButton(2);

    // Assert
    expect(machine._console[3]).to.equal("Not enough money.");
  });

  it("should have balance of zero when no coins inserted", () => {
    // Assert
    expect(machine.balance).to.equal(0);
  });

  it("should display error if item count is zero", () => {
    // Exercise
    machine.insertCoin(500);
    machine.insertCoin(500);
    machine.insertCoin(500);
    machine.pressButton("C");
    machine.pressButton(4);

    // Assert
    expect(machine._console[3]).to.equal("Out of stock.");
  });
});
