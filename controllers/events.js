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
    const { id, title, description, date, maxSeats } = req.body;

    const newEvent = new Event(id, title, description, date, maxSeats);

    const success = Event.saveEvent(newEvent);

    if (success) {
        res.json({ message: 'Evento creato con successo', event: newEvent });
    } else {
        res.status(500).json({ message: 'Errore durante la creazione dell\'evento' });
    }

};

function update(req, res) {


};

function show(req, res) {
    const eventId = parseInt(req.params.id);

    const event = Event.getAllEvents().find((e) => e.id === eventId);

    if (!event) {
        return res.status(404).json({ message: 'Evento non trovato' });
    }

    res.json(event);

};

module.exports = {
    index,
    store,
    update,
    show
}