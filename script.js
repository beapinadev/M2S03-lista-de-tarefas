document.addEventListener('DOMContentLoaded', function () {

    function atualizarContadorDeTarefas() {
        const numeroDeTarefas = document.getElementById('lista-de-tarefas').querySelectorAll('li').length;
        const contadorDeTarefas = document.getElementById('contador-de-tarefas').querySelector('b');
        contadorDeTarefas.textContent = numeroDeTarefas;
    }

    function validarDatas(dataDeInicio, dataDeTermino) {
        const dataInicioValida = moment(dataDeInicio, 'YYYY-MM-DD', true).isValid();
        const dataTerminoValida = moment(dataDeTermino, 'YYYY-MM-DD', true).isValid();
        return dataInicioValida && dataTerminoValida;
    }

    const formularioDeTarefas = document.getElementById('formulario-de-tarefas');
    formularioDeTarefas.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const nomeDaTarefa = document.getElementById('campo-de-tarefa').value.trim();
        const dataDeInicio = document.getElementById('data-de-inicio').value;
        const dataDeTermino = document.getElementById('data-de-termino').value;
        const detalhesDaTarefa = document.getElementById('detalhes-da-tarefa').value.trim();

        if (nomeDaTarefa === '') {
            alert('O nome da tarefa é obrigatório!');
            return;
        }

        if (!validarDatas(dataDeInicio, dataDeTermino)) {
            alert('As datas são inválidas.');
            return;
        }

        if (moment(dataDeInicio).isAfter(moment(dataDeTermino))) {
            alert('A data de início deve ser antes da data de fim!');
            return;
        }

        const htmlDaTarefa = '<li>' + nomeDaTarefa + ' (Início: ' + moment(dataDeInicio).format('DD/MM/YYYY') + ', Fim: ' + moment(dataDeTermino).format('DD/MM/YYYY') + ')' + '<p>' + detalhesDaTarefa + '</p></li>'; 

        const listaDeTarefas = document.getElementById('lista-de-tarefas').querySelector('ul');
        listaDeTarefas.insertAdjacentHTML('beforeend', htmlDaTarefa);

        formularioDeTarefas.reset();

        atualizarContadorDeTarefas();

        alert('Tarefa adicionada com sucesso!');
    });

    const listaDeTarefas = document.getElementById('lista-de-tarefas');
    listaDeTarefas.addEventListener('click', function (evento) {
        if (evento.target.tagName === 'LI') {
            evento.target.classList.toggle('concluida');
        }
    });
});
