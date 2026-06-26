import { useEffect, useRef } from 'react'

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

export function ScrollReveal({ ficha }: { ficha: Ficha }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t1 = setTimeout(() => bodyRef.current?.classList.add('revealed'), 100)
    const t2 = setTimeout(() => bottomRef.current?.classList.add('revealed'), 400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const a = ficha.atributos
  const c = ficha.combate
  const ini = c.iniciativa >= 0 ? `+${c.iniciativa}` : String(c.iniciativa)
  const labels: Record<string, string> = {
    forca: 'FOR', destreza: 'DES', constituicao: 'CON',
    inteligencia: 'INT', sabedoria: 'SAB', carisma: 'CAR',
  }

  return (
    <>
      <style>{`
        .scroll-roll {
          height: 28px;
          background: linear-gradient(to bottom, #c9a96e, #e8d5a3, #c9a96e);
          border-radius: 50%;
          border: 2px solid #8b6914;
          box-shadow: 2px 2px 6px rgba(0,0,0,0.35), inset 0 1px 2px rgba(255,255,255,0.3);
          position: relative;
          z-index: 3;
        }
        .scroll-roll::before {
          content: '';
          position: absolute;
          left: 8px; right: 8px; top: 4px; bottom: 4px;
          border-radius: 50%;
          background: linear-gradient(to bottom, #d4b07a, #f0e0b8, #d4b07a);
        }
        .scroll-roll-bottom {
          margin-top: -2px;
          transform-origin: center top;
          transform: scaleY(0);
          transition: transform 0.5s ease;
        }
        .scroll-roll-bottom.revealed {
          transform: scaleY(1);
        }
        .scroll-body {
          background: linear-gradient(160deg, #f9f0dc, #f2e4c0 30%, #eedcaf 60%, #f4e9c8);
          border-left: 3px solid #c9a96e;
          border-right: 3px solid #c9a96e;
          padding: 0 28px;
          position: relative;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 1.3s cubic-bezier(0.25,0.46,0.45,0.94),
                      opacity 0.5s ease;
        }
        .scroll-body.revealed {
          max-height: 2000px;
          opacity: 1;
        }
        .scroll-body::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            transparent, transparent 28px,
            rgba(139,105,20,0.08) 28px, rgba(139,105,20,0.08) 29px
          );
          pointer-events: none;
        }
        .scroll-body::after {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 14px;
          background: linear-gradient(to right, rgba(0,0,0,0.08), transparent);
          pointer-events: none;
        }
        .scroll-section-title {
          font-size: 11px;
          font-weight: bold;
          color: #8b6914;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin: 14px 0 6px;
          border-bottom: 1px solid rgba(139,105,20,0.3);
          padding-bottom: 3px;
          font-family: Georgia, serif;
        }
      `}</style>

      <div className="flex justify-center my-8 px-4">
        <div className="w-full max-w-lg" style={{ fontFamily: 'Georgia, serif' }}>

          {/* Rolo superior */}
          <div className="scroll-roll" />

          {/* Corpo do pergaminho */}
          <div className="scroll-body" ref={bodyRef}>
            <div className="py-5 relative">

              <h2 className="text-center text-xl font-bold italic" style={{ color: '#3a2810', letterSpacing: '0.04em' }}>
                {ficha.nome}
              </h2>
              <p className="text-center text-xs uppercase tracking-widest mt-1 mb-4" style={{ color: '#6b4c20' }}>
                {ficha.raca} · {ficha.classe} · Nível {ficha.nivel}
              </p>
              <p className="text-center text-lg tracking-[6px] mb-2" style={{ color: '#8b6914' }}>⁕ ⁕ ⁕</p>

              <div className="scroll-section-title">Combate</div>
              <div className="flex justify-around mb-2">
                {[
                  { label: 'Pontos de Vida',      val: c.pontos_de_vida },
                  { label: 'Classe de Armadura',  val: c.classe_de_armadura },
                  { label: 'Iniciativa',           val: ini },
                  { label: 'Deslocamento',         val: c.deslocamento },
                ].map(({ label, val }) => (
                  <div key={label} className="text-center flex-1">
                    <div className="text-lg font-bold" style={{ color: '#3a2810' }}>{val}</div>
                    <span className="text-[9px] uppercase tracking-wide block" style={{ color: '#8b6914' }}>{label}</span>
                  </div>
                ))}
              </div>

              <div className="scroll-section-title">Atributos</div>
              <div className="grid grid-cols-3 gap-1.5 mb-1">
                {Object.entries(labels).map(([key, label]) => {
                  const v = a[key]
                  if (!v) return null
                  const mod = v.modificador >= 0 ? `+${v.modificador}` : String(v.modificador)
                  return (
                    <div key={key} className="text-center rounded p-1" style={{ background: 'rgba(139,105,20,0.08)', border: '1px solid rgba(139,105,20,0.25)' }}>
                      <span className="text-[9px] uppercase tracking-wider block" style={{ color: '#8b6914' }}>{label}</span>
                      <div className="text-base font-bold" style={{ color: '#3a2810' }}>{v.valor}</div>
                      <div className="text-[10px]" style={{ color: '#5c3d12' }}>{mod}</div>
                    </div>
                  )
                })}
              </div>

              <div className="scroll-section-title">Equipamentos</div>
              <ul className="list-disc pl-4 text-xs leading-relaxed" style={{ color: '#3a2810' }}>
                {ficha.equipamentos.map((eq, i) => (
                  <li key={i}>
                    {eq.nome}{eq.dano ? ` — ${eq.dano}` : ''}{eq.notas ? ` (${eq.notas})` : ''}
                  </li>
                ))}
              </ul>

              <div className="scroll-section-title">Características de Classe</div>
              <ul className="list-disc pl-4 text-xs leading-relaxed" style={{ color: '#3a2810' }}>
                {ficha.caracteristicas_de_classe.map((feat, i) => <li key={i}>{feat}</li>)}
              </ul>

              {ficha.tracos_de_especie?.length > 0 && (
                <>
                  <div className="scroll-section-title">Traços de Espécie</div>
                  <ul className="list-disc pl-4 text-xs leading-relaxed" style={{ color: '#3a2810' }}>
                    {ficha.tracos_de_especie.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </>
              )}

              {ficha.talentos?.length > 0 && (
                <>
                  <div className="scroll-section-title">Talentos</div>
                  <ul className="list-disc pl-4 text-xs leading-relaxed" style={{ color: '#3a2810' }}>
                    {ficha.talentos.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </>
              )}

              <div className="scroll-section-title">História</div>
              <p className="text-xs leading-relaxed italic text-justify" style={{ color: '#3a2810' }}>
                {ficha.historia}
              </p>

              <div className="text-center text-2xl mt-3" style={{ color: '#8b6914', opacity: 0.6 }}>⚔</div>
            </div>
          </div>

          {/* Rolo inferior */}
          <div className={`scroll-roll scroll-roll-bottom`} ref={bottomRef} />

        </div>
      </div>
    </>
  )
}