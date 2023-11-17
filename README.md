# express-gestore-eventi

Esercizio
Il nostro obiettivo sarà quello di creare le api per un applicazione che gestirà degli eventi con le relative prenotazioni. Proseguiamo per milestone in modo da avere tutto sotto controllo.

Milestone 1
Creiamo le seguenti rotte con relativo controller e router senza implementare le funzioni del controller.
[GET] events/ (index)
[POST] events/ (store)
[PUT] events/:event (update)

Milestone 2
Creiamo il model (classe) models/event.js e prevediamo le seguenti proprietà:
id
title
description
date
maxSeats (numero massimo di posti)
Tramite dei metodi statici, facciamo in modo di poter leggere e salvare i dati su un file json dedicato.
Un’istanza della classe rappresenterà un singolo evento.

Milestone 3
Usiamo il model nelle funzioni scritte nei controller e facciamo in modo che tramite dei metodi statici del model possiamo recuperare uno (tramite id) o tutti gli eventi.
Prevediamo la possibilità di passare dei filtri tramite query string alla rotta index.