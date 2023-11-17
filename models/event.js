const fs = require("fs");
const path = require("path");

class Event {
    constructor(id, title, description, date, maxSeats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
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

        } catch (error) {
            console.log(("Errore durante il salvataggio dell\'evento:", error))
        }
    }
};

module.exports = Event;