import os
import requests
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
URL = "https://openrouter.ai/api/v1/chat/completions"

EXEMPLO_FICHA = """
{
  "nome": "Jairo Goodgarden",
  "raca": "Draconato",
  "classe": "Paladino",
  "subclasse": "Sem subclasse ainda (nível 1)",
  "antecedente": "Acólito",
  "nivel": 1,
  "atributos": {
    "forca":       { "valor": 14, "modificador": 2 },
    "destreza":    { "valor": 10, "modificador": 0 },
    "constituicao":{ "valor": 12, "modificador": 1 },
    "inteligencia":{ "valor": 9,  "modificador": -1 },
    "sabedoria":   { "valor": 14, "modificador": 2 },
    "carisma":     { "valor": 16, "modificador": 3 }
  },
  "combate": {
    "pontos_de_vida": 11,
    "classe_de_armadura": 18,
    "iniciativa": 0,
    "deslocamento": "9m",
    "tamanho": "Médio",
    "percepcao_passiva": 12,
    "bonus_de_proficiencia": 2
  },
  "salvaguardas_proficientes": ["forca", "constituicao", "sabedoria", "carisma"],
  "pericias_proficientes": ["atletismo", "religiao", "intuicao", "percepcao", "persuasao"],
  "equipamentos": [
    { "nome": "Espada Longa", "bonus_ataque": 4, "dano": "1d8 Cortante", "notas": "Versátil 1d10" },
    { "nome": "Azagaia",      "bonus_ataque": 4, "dano": "1d6 Perfurante", "notas": "Alcance 9/36m" },
    { "nome": "Escudo" }
  ],
  "caracteristicas_de_classe": [
    "Mãos consagradas (5 PV)",
    "Conjuração",
    "Maestria com armas (Espada Longa e Azagaia)"
  ],
  "tracos_de_especie": [
    "Arma de Sopro Gélido — cone 4,5m ou linha 9m, CD 11, 1d10",
    "Resistência a dano Gélido",
    "Visão no Escuro 18m",
    "Voo (disponível no nível 5)"
  ],
  "talentos": ["Iniciado em magia (Clérigo)"],
  "proficiencias": {
    "armaduras": ["Leve", "Média", "Pesada", "Escudos"],
    "armas": ["Armas simples", "Armas marciais"],
    "ferramentas": ["Suprimento de caligrafia"]
  },
  "historia": "Jairo cresceu nos templos de sua ordem, servindo como acólito antes de seguir o chamado sagrado do paladino."
}
"""

def gerar_personagem(descricao: str) -> dict:
    prompt_sistema = f"""
Você é um especialista em RPG de mesa, especializado em D&D 5e (2024).

Analise a descrição enviada pelo usuário e gere uma ficha de personagem completa em JSON.

Regras:
- Se o sistema não for informado, utilize D&D 5e 2024.
- Extraia raça, classe, personalidade, equipamentos e qualquer detalhe mencionado.
- Preencha campos faltantes de forma coerente com a descrição.
- Retorne APENAS o JSON, sem texto adicional, sem blocos de código markdown.
- Qualquer coisa que não for relacionada a rpg, não responda.

Aqui está um exemplo do formato esperado:
{EXEMPLO_FICHA}

Siga exatamente essa estrutura.
"""

    response = requests.post(
        URL,
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "openai/gpt-oss-120b:free",
            "messages": [
                {"role": "system", "content": prompt_sistema},
                {"role": "user",   "content": descricao}
            ]
        }
    )

    print("Status:", response.status_code)
    print(response.text)

    data = response.json()

    print(data)

    if "choices" not in data:
        raise Exception(data)

    conteudo = data["choices"][0]["message"]["content"]

    # Remove possíveis blocos markdown que o modelo retorne mesmo assim
    conteudo = conteudo.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()

    import json
    return json.loads(conteudo)