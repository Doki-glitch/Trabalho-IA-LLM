import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [descricao, setDescricao] = useState('')
  const navigate = useNavigate()

  function handleGerar() {
    if (!descricao.trim()) return
    navigate('/gerar', { state: { descricao } })
  }

  return (
    <div className='bg-[#F4EFE6] bg-[url(/Borda.svg)] bg-contain bg-no-repeat min-h-screen bg-center'>
      <div className='2xl:pt-24 pt-16.25 flex flex-col justify-center items-center gap-2'>
        <div className='2xl:w-1/2 w-[40%]'>
          <h1 className='font-marck 2xl:text-[32px] text-xl text-[#2E2923]'>
            Vossa Majestade, chegou aos meus ouvidos que a situação de seu reino está grave. Como somos de nações aliadas, decidi prestar apoio à vossa mercê. Estou lhe enviando esta carta. Nela está presente um feitiço que irá conjurar do absoluto nada um herói capaz de salvar sua nação. Para realizar o feitiço você precisa mentalizar o herói e descrevê-lo no espaço demarcado abaixo. Quando a descrição estiver completa, toque com a ponta de sua caneta no pequeno círculo mágico ali presente e assim ele aparecerá.
          </h1>
        </div>

        <div className='bg-[#EAE2D4] 2xl:w-1/2 w-[40%] 2xl:h-60 h-34.5 border rounded-[20px] outline-[#2E2923] outline-4 flex flex-col'>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descreva seu personagem'
            className='m-2 font-garamond font-semibold 2xl:text-[32px] text-xl size-full'
          />
          <div className='flex items-end justify-end'>
            <button onClick={handleGerar} disabled={!descricao.trim()}>
              <img src="Botão.svg" alt="Gerar" className='size-16.25 cursor-pointer' />
            </button>
          </div>
        </div>

        <div className='2xl:w-1/2 w-[40%] text-start'>
          <h1 className='font-marck 2xl:text-[32px] text-xl text-[#2E2923]'>-- Merlin V de Camelot</h1>
        </div>
        <div className='2xl:w-1/2 w-[40%] flex justify-end items-end'>
          <img src="Selo.svg" alt="" className='2xl:size-24 size-16'/>
        </div>
      </div>
    </div>
  )
}