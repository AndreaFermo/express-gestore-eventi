const Event = require("../models/event");
const moment = require("moment");
function index(req, res) {

    const { title, description } = req.query;

    let events = Event.getAllEvents();

    if (title) {
        events = events.filter((event) => event.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (description) {
        events = events.filter((event) => event.description.toLowerCase().includes(description.toLowerCase()));
    }

    res.json(events);
};

function store(req, res) {

    checkParams(req);

    if (req.body.date) {
        isValidDate(req.body.date);
    }

    const { title, description, date, maxSeats } = req.body;

    if (!title || !description || !date || !maxSeats) {
        throw new Error("I campi sono tutti obbligatori");
    }


    if (!parseInt(maxSeats) || parseInt(maxSeats) < 0) {
        throw new Error("Il valore di maxSeats non deve contenere caratteri che non siano numeri e non può essere negativo");
    }


    const newEvent = new Event(title, description, date, parseInt(maxSeats));

    const success = Event.saveEvent(newEvent);

    if (success) {
        res.json({ message: "Evento creato con successo", event: newEvent });
    } else {
        throw new Error("Errore nella creazione dell'evento");
    }

};

function update(req, res) {

    checkParams(req);

    if (req.body.date) {
        isValidDate(req.body.date);
    }

    if (req.body.maxSeats) {
        if (!parseInt(req.body.maxSeats) || parseInt(req.body.maxSeats) < 0) {
            throw new Error("Il valore di maxSeats non deve contenere caratteri che non siano numeri e non può essere negativo");
        }
    }

    const eventId = parseInt(req.params.id);
    const updatedEventData = req.body;
    const updatedEvent = Event.updateEvent(eventId, updatedEventData);
    res.json({ message: 'Evento aggiornato con successo', event: updatedEvent });
};

function show(req, res) {
    const eventId = parseInt(req.params.id);

    const event = Event.getAllEvents().find((e) => e.id === eventId);

    if (!event) {
        throw new Error("L'evento non esiste!");
    }

    res.json(event);

};

function checkParams(req) {
    const requiredKeys = ["date", "title", "description", "maxSeats"];
    const paramKeys = Object.keys(req.body);

    const hasExtraKeys = paramKeys.some(key => !requiredKeys.includes(key));

    if (hasExtraKeys) {
        throw new Error("L'oggetto contiene chiavi aggiuntive non consentite");
    }

}

function isValidDate(dateString) {

    const isValidFormat = moment(dateString, 'YYYY-MM-DD', true).isValid();

    if (!isValidFormat) {
        throw new Error("Formato della data non valido. Utilizzare il formato YYYY-MM-DD.");
    }

    const currentDate = moment();
    const inputDate = moment(dateString);

    if (inputDate.isBefore(currentDate, "day")) {
        throw new Error("La data deve essere superiore o uguale alla data attuale.");
    }


}

module.exports = {
    index,
    store,
    update,
    show
}