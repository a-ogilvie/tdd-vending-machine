const VendingMachine = require("../VendingMachine");
const { expect } = require("chai");

describe("vending machine", () => {
  it("should accept valid coins", () => {
    // Setup
    const machine = new VendingMachine();

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
    // Setup
    const machine = new VendingMachine();

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
    // Setup
    const machine = new VendingMachine();

    // Exercise
    machine.pressButton("A");

    // Assert
    expect(machine.selection.row).to.equal("A");
  });

  it("should reject a number when no row is selected", () => {
    // Setup
    const machine = new VendingMachine();

    // Exercise
    machine.pressButton(1);

    // Assert
    expect(machine.selection.row).to.be.undefined;
    expect(machine.selection.column).to.be.undefined;
  });
});
