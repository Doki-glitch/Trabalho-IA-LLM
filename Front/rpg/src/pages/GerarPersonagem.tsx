import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScrollReveal } from '../components/ScrollReveal'

interface Ficha {
  nome: string
  raca: string
  classe: string
  nivel: number
  atributos: Record<string, { valor: number; modificador: number }>
  combate: {
    pontos_de_vida: number
    classe_de_armadura: number
    iniciativa: number
    deslocamento: string
  }
  equipamentos: { nome: string; bonus_ataque?: number; dano?: string; notas?: string }[]
  caracteristicas_de_classe: string[]
  tracos_de_especie: string[]
  talentos: string[]
  historia: string
}

export default function GerarPersonagem() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [ficha, setFicha] = useState<Ficha | null>(null)
  const [erro, setErro] = useState('')
  const hasFetched = useRef(false)

  useEffect(() => {
    // Redireciona se chegar sem descrição
    if (!state?.descricao) {
      navigate('/')
      return
    }
    // Evita chamar duas vezes no StrictMode
    if (hasFetched.current) return
    hasFetched.current = true

    async function gerar() {
        console.log("Descrição enviada:", state.descricao);

      try {
        const response = await fetch('/gerar-personagem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ descricao: state.descricao }),
        })

        console.log(response.status);

        if (!response.ok) {
  const erro = await response.json();
  console.log(erro);
  throw new Error(erro.detail);
}
        const data: Ficha = await response.json()
        setFicha(data)
      } catch (e: any) {
        setErro(e.message)
      }
    }

    gerar()
  }, [])

  return (
    <div className='bg-[#F4EFE6] bg-[url(/Borda.svg)] bg-contain bg-no-repeat min-h-screen bg-center'>
      <div className='flex flex-col justify-center items-center pt-16 pb-12'>

        {/* Loading — círculo mágico */}
        {!ficha && !erro && (
          <div className='flex flex-col items-center gap-4 mt-16'>
            <div className='relative w-24 h-24'>
              <div className='absolute inset-0 rounded-full border-4 border-[#2E2923]/20 border-t-[#2E2923] animate-spin' />
              <div
                className='absolute inset-3 rounded-full border-2 border-[#2E2923]/10 border-b-[#2E2923]/40 animate-spin'
                style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
              />
              <div className='absolute inset-0 flex items-center justify-center text-2xl' style={{ color: '#2E2923' }}>
                ✦
              </div>
            </div>
            <p className='font-marck text-[#2E2923] text-xl'>Conjurando o herói...</p>
          </div>
        )}

        {/* Erro */}
        {erro && (
          <div className='flex flex-col items-center gap-4 mt-16'>
            <p className='font-garamond text-red-800 text-lg'>{erro}</p>
            <button
              onClick={() => navigate('/')}
              className='font-marck text-[#2E2923] underline text-lg'
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Pergaminho */}
        {ficha && (
          <>
            <ScrollReveal ficha={ficha} />
            <button
              onClick={() => navigate('/')}
              className='font-marck text-[#2E2923] underline text-lg mt-4'
            >
              Conjurar outro herói
            </button>
          </>
        )}

      </div>
    </div>
  )
}