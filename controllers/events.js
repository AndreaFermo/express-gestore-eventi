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
    const { title, description, date, maxSeats } = req.body;

    const newEvent = new Event(title, description, date, maxSeats);

    const success = Event.saveEvent(newEvent);

    if (success) {
        res.json({ message: "Evento creato con successo", event: newEvent });
    } else {
        throw new Error("Errore nella creazione dell'evento");
    }

};

function update(req, res) {


};

function show(req, res) {
    const eventId = parseInt(req.params.id);

    const event = Event.getAllEvents().find((e) => e.id === eventId);

    if (!event) {
        throw new Error("L'evento non esiste!");
    }

    res.json(event);

};

module.exports = {
    index,
    store,
    update,
    show
}