const fs = require("fs");
const path = require("path");

class Event {
    constructor(id, title, description, date, maxSeats) {
        this.id = Event.getNextId();
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    static getNextId() {
        const filePath = path.resolve(__dirname, "..", "db", "events.json");

        try {
            const fileContent = fs.readFileSync(filePath);
            const events = JSON.parse(fileContent);

            const maxId = events.reduce((max, event) => (event.id > max ? event.id : max), 0);

            return maxId + 1;
        } catch (error) {
            return 1;
        }
    }

    static getAllEvents() {
        const filePath = path.resolve(__dirname, "..", "db", "events.json");

        try {
            const fileContent = fs.readFileSync(filePath);
            const events = JSON.parse(fileContent);
            return events;
        } catch (error) {
            console.log(("Errore durante l'apertura del database", error))
            return [];
        }
    }

    static saveEvent(event) {
        const filePath = path.resolve(__dirname, "..", "db", "events.json");

        try {
            const existingEvents = Event.getAllEvents();

            existingEvents.push(event);

            fs.writeFileSync(filePath, JSON.stringify(existingEvents, null, 2));
            return true;

        } catch (error) {
            console.log(("Errore durante il salvataggio dell\'evento:", error))
            return false;
        }
    }
};

module.exports = Event;