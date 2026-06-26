# Trabalho-IA-LLM

Criador de fichas de personagem para RPG. Cria uma ficha de personagem de RPG de mesa com base na sua descrição e história

## Funcionalidades
* Funcionalidade: Cria uma ficha de personagem com base em descrição

## Feito com
* Back-End: FastAPI
* Front-End: Vite + React + TailwindCSS

## Instalação & Execução

# Clone o repositório
git clone https://github.com/Doki-glitch/Trabalho-IA-LLM.git

* Back-End:
'''bash
# Vá até a pasta Back
cd Trabalho-IA-LLM
cd Back

# Criar um .env com o seguinte código
OPENROUTER_API_KEY=("Insira aqui a sua chave de API da OpenRouter)

# Crie e ative um ambiente virtual
* Windowns
python -m venv myfirstproject
myfirstproject\Scripts\activate

* Linux/MacOS
python -m venv myfirstproject
source myfirstproject/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Rode o Back-End
python -m uvicorn main:app --reload
'''

* Front-End: 
'''bash
# Vá até a pasta 'rpg'
cd Trabalho-IA-LLM
cd Front
cd rpg

# Criar um .env com o seguinte código
VITE_API_URL=http://localhost:8000

# Instale as dependências
npm i

# Rode o Front-End
npm run dev
o
'''

## Desenvolvido por
<a href="https://github.com/gabrielcaldeiramedeiros1999"><img src="https://github.com/gabrielcaldeiramedeiros1999.png" width="45" height="45"></a> &nbsp;
<a href="https://github.com/Doki-glitch"><img src="https://github.com/Doki-glitch.png" width="45" height="45"></a> &nbsp;