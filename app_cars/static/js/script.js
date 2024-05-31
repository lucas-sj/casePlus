document.getElementById('btn_save').addEventListener('click', function() {
    const automaker = document.getElementById('automaker').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;

    fetch('add_car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            automaker: automaker,
            model: model,
            year: year
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Carro salvo com sucesso!');
            clearFormFields()
            search_car()
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('btn_search').addEventListener('click', function() {
    search_car()
});
function search_car(){
    const automaker = document.getElementById('automaker').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;

    const queryParams = new URLSearchParams({
        automaker: automaker,
        model: model,
        year: year
    });

    fetch('search_car?' + queryParams.toString(), {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            displayResults(data.cars);
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayResults(cars) {
    const resultDiv = document.querySelector('.result');
    resultDiv.innerHTML = '';

    if (cars.length === 0) {
        resultDiv.innerHTML = '<p>Nenhum carro encontrado.</p>';
        return;
    }

    const table = document.createElement('table');
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    headerRow.insertCell(0).innerText = '';
    headerRow.insertCell(1).innerText = 'ID';
    headerRow.insertCell(2).innerText = 'Montadora';
    headerRow.insertCell(3).innerText = 'Modelo';
    headerRow.insertCell(4).innerText = 'Ano';

    const tbody = table.createTBody();
    cars.forEach(car => {
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('data-id', car.id);
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-pencil';
        icon.setAttribute('data-id', car.id);
        cell.appendChild(checkbox);
        cell.appendChild(icon);

        row.insertCell(1).innerText = car.id;
        row.insertCell(2).innerText = car.automakers;
        row.insertCell(3).innerText = car.model;
        row.insertCell(4).innerText = car.year;
    });

    resultDiv.appendChild(table);
}

document.getElementById('btn_delete').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.result input[type="checkbox"]:checked');
    const ids = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-id'));

    if (ids.length === 0) {
        alert('Por favor, selecione pelo menos um carro para deletar.');
        return;
    }

    const queryParams = new URLSearchParams();
    ids.forEach(id => queryParams.append('ids', id));

    fetch('delete_car?' + queryParams.toString(), {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Carros deletados com sucesso!');
            search_car()
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Função para obter o CSRF token dos cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function clearFormFields() {
    document.getElementById('automaker').value = '';
    document.getElementById('model').value = '';
    document.getElementById('year').value = '';
}