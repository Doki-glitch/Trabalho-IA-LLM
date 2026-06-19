from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json

from oss import gerar_personagem

app = FastAPI()


class PersonagemRequest(BaseModel):
    descricao: str


@app.post("/gerar-personagem")
def gerar(req: PersonagemRequest):
    try:
        ficha = gerar_personagem(req.descricao)
        return ficha
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="O modelo não retornou um JSON válido.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))