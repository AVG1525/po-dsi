const url = 'https://localhost:5001/api/Games';
const url_jogador = 'https://localhost:5001/api/Jogadores';
let games = [];
let jogadores = [];

function getGames(){
    fetch(url)
        .then((response) => response.json())
        .then(data => _displayGames(data))
        .catch(error => console.error());
}

function getJogadores(){
    fetch(url_jogador)
        .then((response) => response.json())
        .then(data => _displayJogadores(data))
        .catch(error => console.error());
}

function addGame(){
    const addNameTextbox = document.getElementById('add-name');
    const addSinopseTextbox = document.getElementById('add-sinopse');
    const addPlataformaTextbox = document.getElementById('add-plataforma');
    const addAnoLancamentoTextbox = document.getElementById('add-anolancamento');

    const game = {
        nome: addNameTextbox.value.trim(),
        sinopse: addSinopseTextbox.value.trim(),
        plataforma: addPlataformaTextbox.value.trim(),
        anoLancamento: parseInt(addAnoLancamentoTextbox.value.trim(),10)
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    })
    .then(response => response.json())
    .then(() => {
        getGames();
        addNameTextbox.value = '';
        addSinopseTextbox.value = '';
        addPlataformaTextbox.value = '';
        addAnoLancamentoTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error))
}

function addJogador(){
    const addNomeJogadorTextbox = document.getElementById('add-nome-jogador');
    const addIdadeJogadorTextbox = document.getElementById('add-idade-jogador');
    const addNomeUsuarioTextbox = document.getElementById('add-nome-usuario');
    const addNomeGameTextbox = document.getElementById('add-nome-game');

    const jogador = {
        nome: addNomeJogadorTextbox.value.trim(),
        usuario: addNomeUsuarioTextbox.value.trim(),
        jogo: addNomeGameTextbox.value.trim(),
        idade: parseInt(addIdadeJogadorTextbox.value.trim(),10)
    }
    fetch(url_jogador, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jogador)
    })
    .then(response => response.json())
    .then(() => {
        getJogadores();
        getGames();
        addNomeJogadorTextbox.value = '';
        addIdadeJogadorTextbox.value = '';
        addNomeGameTextbox.value = '';
        addNomeUsuarioTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error))
}

function deleteGame(id){
    if(confirm("Tem certeza que deseja excluir este game?")){
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        .then(() => getGames())
        .catch(error => console.error('Unable to delete item.', error));
    }
}

function deleteJogador(id){
    if(confirm("Tem certeza que deseja excluir este jogador?")){
        fetch(`${url_jogador}/${id}`, {
            method: 'DELETE'
        })
        .then(() => {getJogadores(); getGames();})
        .catch(error => console.error('Unable to delete item.', error));
    }
}

function displayEditForm(id){
    const game = games.find(game => game.id === id);

    document.getElementById('edit-name').value = game.nome;
    document.getElementById('edit-id').value = game.id;
    document.getElementById('edit-sinopse').value = game.sinopse;
    document.getElementById('edit-plataforma').value = game.plataforma;
    document.getElementById('edit-anolancamento').value = game.anoLancamento;
    document.getElementById('editForm').style.display = 'block';
}

function displayEditFormJogador(id){
    const jogador = jogadores.find(jogador => jogador.id === id);

    document.getElementById('edit-name-jogador').value = jogador.nome;
    document.getElementById('edit-id-jogador').value = jogador.id;
    document.getElementById('edit-idade-jogador').value = jogador.idade;
    document.getElementById('edit-nome-usuario').value = jogador.usuario;
    document.getElementById('edit-nome-game').value = jogador.jogo;
    document.getElementById('editFormJogador').style.display = 'block';
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('editFormJogador').style.display = 'none';
}

function updateGame() {
    const gameId = document.getElementById('edit-id').value;

    const game = {
        id : parseInt(gameId, 10),
        nome: document.getElementById('edit-name').value.trim(),
        sinopse: document.getElementById('edit-sinopse').value.trim(),
        plataforma: document.getElementById('edit-plataforma').value.trim(),
        anoLancamento: parseInt(document.getElementById('edit-anolancamento').value,10)
    };

    fetch(`${url}/${gameId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    })
    .then(() => getGames())
    .catch(error => console.error('Unable to update item.', error));

    closeInput(true);

    return false;
}

function updateJogador() {
    const jogadorId = document.getElementById('edit-id-jogador').value;

    const jogador = {
        id : parseInt(jogadorId, 10),
        nome: document.getElementById('edit-name-jogador').value.trim(),
        idade: parseInt(document.getElementById('edit-idade-jogador').value,10),
        usuario: document.getElementById('edit-nome-usuario').value.trim(),
        jogo: document.getElementById('edit-nome-game').value.trim()
    };

    fetch(`${url_jogador}/${jogadorId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jogador)
    })
    .then(() => {getJogadores(); getGames();})
    .catch(error => console.error('Unable to update item.', error));

    closeInput(false);

    return false;
}

function _displayGames(data){
    const tBody = document.getElementById('games');
    jogos = data;
    tBody.innerHTML='';
    const button = document.createElement('button');

    jogos.forEach(game => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${game.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute("onclick", `deleteGame(${game.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNome = document.createTextNode(game.nome);
        td1.appendChild(textNome);

        let td2 = tr.insertCell(1);
        let textSinop = document.createTextNode(game.sinopse);
        td2.appendChild(textSinop);

        let td3 = tr.insertCell(2);
        let textPlataforma = document.createTextNode(game.plataforma);
        td3.appendChild(textPlataforma);
    
        let td4 = tr.insertCell(3);
        let textAnoLancamento = document.createTextNode(game.anoLancamento);
        td4.appendChild(textAnoLancamento);

        let td5 = tr.insertCell(4);
        let textQtdeJogadores = document.createTextNode(game.qtdeJogadores);
        td5.appendChild(textQtdeJogadores);

        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);

        let td7 = tr.insertCell(6);
        td7.appendChild(deleteButton);
    });

    games = data;   

}

function _displayJogadores(data){
    const tBody = document.getElementById('jogadores');
    jogos = data;
    tBody.innerHTML='';
    const button = document.createElement('button');

    jogos.forEach(jogador => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditFormJogador(${jogador.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute("onclick", `deleteJogador(${jogador.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNome = document.createTextNode(jogador.nome);
        td1.appendChild(textNome);

        let td2 = tr.insertCell(1);
        let textIdade = document.createTextNode(jogador.idade);
        td2.appendChild(textIdade);

        let td3 = tr.insertCell(2);
        let textUsuario = document.createTextNode(jogador.usuario);
        td3.appendChild(textUsuario);

        let td4 = tr.insertCell(3);
        let textJogo = document.createTextNode(jogador.jogo);
        td4.appendChild(textJogo);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });

    jogadores = data;   

}