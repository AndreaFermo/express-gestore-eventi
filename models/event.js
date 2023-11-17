const fs = require("fs");
const path = require("path");

class Event {

    constructor(title, description, date, maxSeats) {
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
            console.log(("Errore durante l'apertura del database"))
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

            return false;
        }
    }

    static updateEvent(id, updatedEventData) {
        const filePath = path.resolve(__dirname, "..", "db", "events.json");
        const events = Event.getAllEvents();
        const eventIndex = events.findIndex((event) => event.id === id);

        if (eventIndex === -1) {
            throw new Error('Evento non trovato');
        }

        events[eventIndex] = { ...events[eventIndex], ...updatedEventData };
        console.log(typeof events[eventIndex].maxSeats)

        if (typeof events[eventIndex].maxSeats != "int") {
            events[eventIndex].maxSeats = parseInt(events[eventIndex].maxSeats);
        }

        try {
            fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
            return events[eventIndex];
        } catch (error) {
            throw new Error("Errore durante l'aggiornamento dell'evento");
        }
    }
};

module.exports = Event;