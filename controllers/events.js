const Event = require('../models/event');
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

    checkParams(req)

    const { title, description, date, maxSeats } = req.body;


    if (!parseInt(maxSeats)) {
        throw new Error("Il valore di maxSeats non deve contenere caratteri che non siano numeri");
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

    checkParams(req)

    if (!parseInt(req.body.maxSeats)) {
        throw new Error("Il valore di maxSeats noon deve contenere caratteri che non siano numeri");
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
    const requiredKeys = ['id', 'title', 'description', 'maxSeats'];
    const paramKeys = Object.keys(req.body);

    const hasExtraKeys = paramKeys.some(key => !requiredKeys.includes(key));

    if (hasExtraKeys) {
        throw new Error("L'oggetto contiene chiavi aggiuntive non consentite");
    }

}

module.exports = {
    index,
    store,
    update,
    show
}