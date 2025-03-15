class Booking {
    constructor(bookingStatus, carparkAddress, bookingTime) {
        this.id = Math.random().toString(36).substr(2, 9); // Generate random ID
        this.bookingStatus = bookingStatus;
        this.carparkAddress = carparkAddress;
        this.bookingTime = bookingTime;
    }

    getBookingStatus() { return this.bookingStatus; }
    setBookingStatus(status) { this.bookingStatus = status; }

    getCarparkAddress() { return this.carparkAddress; }
    setCarparkAddress(address) { this.carparkAddress = address; }

    getBookingTime() { return this.bookingTime; }
    setBookingTime(time) { this.bookingTime = time; }

    getId() { return this.id; }
}

export default Booking;