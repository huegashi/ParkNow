import Booking from './Booking';

class Driver {
    #username;
    #password;
    #bookedCarpark;
    #userId;

    constructor(username, password, userId) {
        this.#username = username;
        this.#password = password;
        this.#userId = userId;
        // Initialize with empty booking using userId
        this.#bookedCarpark = new Booking(userId, null, null);
    }

    getUsername() { return this.#username; }
    setUsername(username) { this.#username = username; }

    getPassword() { return this.#password; }
    setPassword(password) { this.#password = password; }

    getUserId() { return this.#userId; }

    getBookedCarpark() { return this.#bookedCarpark; }
    setBooking(booking) { this.#bookedCarpark = booking; }
    removeBooking() { 
        // Use the current userId when creating new empty booking
        this.#bookedCarpark = new Booking(this.#userId, null, null);
    }
}

export default Driver;