Primeiro clonar o projeto
# git clone https://github.com/lucas-sj/casePlus.git

Segundo acessar o projeto
# cd casePlus/

Terceiro instalar e ativar o ambiente virtual python com nome de virtual

Criar
# python -m venv virtual
Ativar
# source virtual/Scripts/activate

Quarto instalar o Django no ambiente virtual
# pip install Django==5.0.6

Quinto executar o comando
# python manage.py migrate

Sexto executar o comando para dar rodar o projeto
# python manage.py runserver

Acessar a url http://127.0.0.1:8000/

# Justificando desenvolvimento
Para o desenvolvimento desta aplicação usei o Python com o framework Django, seguindo o padrão ORM do framework. A escolha do projeto foi um cadastro simples de carros, um assunto que me interessa. O cadastro requer preenchimento dos campos de fabricante, modelo e ano do carro, com as funcionalidades de cadastro, atualização, busca e remoção de registros do sistema.
A escolha pelo Django foi motivada pela minha familiaridade com o Python e pela praticidade e organização que o Django oferece no desenvolvimento. Procurei manter o código o mais legível possível, utilizando os métodos adequados para cada ação, como GET, POST e DELETE.

Para a atualização de registros, optei por não utilizar o método PUT para evitar poluição excessiva do código. Em vez disso, utilizei a mesma função que salva um novo registro para também atualizar um registro existente. Isso tornou o desenvolvimento mais prático e facilita a manutenção do código.
