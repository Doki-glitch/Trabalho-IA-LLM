import './App.css'

function App() {

  return (
    <>
      <html lang='pt-br' className='bg-[#F4EFE6] bg-[url(/Borda.svg)] bg-contain bg-no-repeat min-h-screen bg-center'></html>
      <div className='pt-18 flex flex-col justify-center items-center gap-3'>
        <div className='w-1/2'>
          <h1 className='font-marck text-[32px] text-[#2E2923]'>Vossa Majestade, chegou aos meus ouvidos que a situação de seu reino está grave. Como somos de nações aliadas, decidi prestar apoio à vossa mercê. Estou lhe enviando esta carta. Nela está presente um feitiço que irá conjurar do absoluto nada um herói capaz de salvar sua nação. Para realizar o feitiço você precisa mentalizar o herói e descrevê-lo no espaço demarcado abaixo. Quando a descrição estiver completa, toque com a ponta de sua caneta no pequeno círculo mágico ali presente e assim ele aparecerá.</h1>
        </div>
        <div className='bg-[#EAE2D4] w-1/2 h-60 border rounded-[20px] outline-[#2E2923] outline-4 flex flex-col'>
          <textarea placeholder='Descreva seu personagem' className='m-2 font-garamond font-semibold text-[32px] size-full'></textarea>
          <div className=' flex items-end justify-end'>
            <button><img src="Botão.svg" alt="" className='size-16.25 cursor-pointer'/></button>
          </div>
        </div>
        <div className='w-1/2 text-start'>
          <h1 className='font-marck text-[32px] text-[#2E2923]'>-- Merlin V de Camelot</h1>
        </div>
        <div className='w-1/2 flex justify-end items-end'>
          <img src="Selo.svg" alt="" className='size-28'/>
        </div>
      </div>
    </>
  )
}

export default App
