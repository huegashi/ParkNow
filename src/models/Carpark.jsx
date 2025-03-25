class Carpark {
  constructor(name, address, totalLots, lotType, availLots) {
    this.name = name;
    this.address = address;
    this.totalLots = totalLots;
    this.lotType = lotType;
    this.availLots = availLots;
  }

  getName() {
    return this.name;
  }

  getAddress() {
    return this.address;
  }
  setAddress(address) {
    this.address = address;
  }

  getTotalLots() {
    return this.totalLots;
  }
  setTotalLots(totalLots) {
    this.totalLots = totalLots;
  }

  getLotType() {
    return this.lotType;
  }
  setLotType(lotType) {
    this.lotType = lotType;
  }

  getAvailLots() {
    return this.availLots;
  }
  setAvailLots(availLots) {
    this.availLots = availLots;
  }

  // Helper method to calculate occupancy percentage
  getOccupancyPercentage() {
    return ((this.totalLots - this.availLots) / this.totalLots) * 100;
  }
}

export default Carpark;
