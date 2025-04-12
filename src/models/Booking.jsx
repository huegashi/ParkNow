import { v4 as uuidv4 } from 'uuid';

class Booking {
    #id;        // String
    #userId;    // String
    #carparkId; // String
    #status;    // String
    #startTime; // DateTime

    constructor(userId, carparkId, startTime) {
        this.#id = uuidv4(); // Auto-generate ID
        this.#userId = userId;
        this.#carparkId = carparkId;
        this.#startTime = startTime;
        this.#status = 'No booking';
    }

    getId() { return this.#id; }
    setId(id) { this.#id = id; }

    getUserId() { return this.#userId; }
    setUserId(userId) { this.#userId = userId; }

    getCarparkId() { return this.#carparkId; }
    setCarparkId(carparkId) { this.#carparkId = carparkId; }

    getStatus() { return this.#status; }
    setStatus(status) { this.#status = status; }

    getStartTime() { return this.#startTime; }
    setStartTime(startTime) { this.#startTime = startTime; }
}

export default Booking;
