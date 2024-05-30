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