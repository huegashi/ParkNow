class Booking {
    #id;        // String
    #userId;    // String
    #carparkId; // String
    #status;    // String
    #startTime; // DateTime

    constructor(id, userId, carparkId, startTime) {
        this.#id = id;
        this.#userId = userId;
        this.#carparkId = carparkId;
        this.#startTime = startTime;
        this.#status = 'pending';
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
