//OPERAZIONI CRUD
//CREATE - READ - UPDATE - DELETE

document.addEventListener('DOMContentLoaded', () => {

        //recupero endpoiint dal json-server(che espone)
       // const API_URL = 'http://localhost:3000/films';
        const API_URL = "https://690b38956ad3beba00f3fab5.mockapi.io/films/films"

        //seleziona il campo input per l inserimento di nuovi film
        const newFilmInput = document.getElementById('new-film');

        //seleziona il pulsante per aggiungere un nuovo film
        const addFilmBtn = document.getElementById('add-film');

        //seleziona l elemento <ul> dove andranno inseriti i nuovi film
        const filmList = document.getElementById('film-list');
        const newRegista = document.getElementById('nuovo_regista');
        const newVoto = document.getElementById('nuovo_voto');
        const newYear = document.getElementById('year_movie')

        //FUNZIONE READ - recupera tutti i film della api e li mostra
        function fetchFilm() {

            fetch(API_URL)// Invia una richiesta GET all endpoint API

                .then(res => res.json()) //converte la risposta i formato JSON
                .then(data => {  // una volta ottenuti i dati...

                    filmList.innerHTML = ''; // bona pratica per svuotare il container che verrà popolato con i dati

                    data.forEach(film => { // per ogni film ricevuto...

                        const li = document.createElement('li'); //creo un nuovo elemento <li>
                        const span = document.createElement('span') // creo uno span per il Titolo
                        span.textContent = 
                                        "🎥 Film: " + film.title + "; " 
                                        + "🎬 Regista: " + film.regista + "; "  
                                        + "⏳ Anno: " + film.anno  + "; " 
                                        + "⭐ Voto:  " + film.voto; // imposto il testo del film
                        
                        //creo il pulsante per modificare il titolo
                        const editBtn = document.createElement('button');
                        editBtn.textContent = 'Edit';
                        editBtn.onclick = () => editFilm(film); // collego la funzione di modifica al editBtn
                        editBtn.textContent = "✏️"
                        //creo il pulsante per eliminare il film
                        const deleteBtn = document.createElement('button');
                        deleteBtn.textContent = 'Delete';
                        deleteBtn.onclick = () => deleteFilm(film.id); // collego la funzione di delete al btn
                        deleteBtn.textContent = "🗑️"

                        //raggruppo i bottoni in un div
                        const btnGroup = document.createElement('div');
                        btnGroup.append(editBtn, deleteBtn);

                        //aggiungo il titolo e i bottoni al <li>, poi alla lista
                        li.append(span, btnGroup);
                        filmList.appendChild(li);
                    })
                    console.log(data);
                })
        }

        //FUNZIONE CREATE
        //prendo il button e associo un evento click 
        addFilmBtn.addEventListener('click', function(){

            const title = newFilmInput.value.trim(); // prendo il valore in input e rimuvo gli spazi
            const regista = newRegista.value.trim();
            const voto = newVoto.value.trim();
            const anno = newYear.value.trim();
            if(title&&regista  || title || regista && title !== null && regista !== null){   // se il titolo è stato inserito

                fetch(API_URL, {

                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({title, regista, anno, voto}) // crea il film

                }).then(() => {

                    newFilmInput.value = ''; //svuoto il campo input
                    newRegista.value = '';
                    newVoto.value = '';
                    newYear.value = '';
                    fetchFilm(); // richiamo la funzione per ricaricare i film e quindi vedere il nuovo film inserito
                });
            } else {
                alert("Inserisci titolo o regista")
            }
        });

        //FUNZIONE UPDATE
        function editFilm(film){

            const nuovoTitolo = prompt('Modifica il titolo:', film.title); //chiedo il nuovo titolo
            const nuovoRegista = prompt("Modifica il regista:", film.regista);
            const nuovoAnno = prompt("Modifica l'anno", film.anno);
            const nuovoVoto = prompt("Modifica il voto:", film.voto);
            
            if(nuovoTitolo !== null && nuovoTitolo.trim() !== '') { //Se ho effettivamente un nuovo titolo

                fetch(`${API_URL}/${film.id}`,{

                    method : 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({...film, 
                                            title: nuovoTitolo.trim(), 
                                            regista: nuovoRegista.trim(), 
                                            anno: nuovoAnno.trim(),  
                                            voto: nuovoVoto.trim()}) // prendo l oggetto film e invio il nuovo titolo

                }).then(fetchFilm); // ricarico i film
            } 
        }

        //FUNZIONE DELETE
        function deleteFilm(id){ //elimino un film in abse all ID

            fetch(`${API_URL}/${id}`,{

                    method : 'DELETE' //Metodo DELETE per rimuovere
                
                }).then(fetchFilm); // ricarico i film
        }

        fetchFilm();

});