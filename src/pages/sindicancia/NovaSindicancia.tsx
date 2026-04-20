import React from 'react'

export default function NovaSindicancia() {
  return (
    <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Nova Sindicância</h1>
        <p className="text-muted-foreground mt-1 font-medium">
          Formulário para criar uma nova sindicância e gerenciar investigações.
        </p>
      </div>

      <div className="flex-1 bg-card rounded-xl border border-border flex items-center justify-center p-8 text-center shadow-sm">
        <div className="max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Módulo em Desenvolvimento</h2>
          <p className="text-muted-foreground">
            A interface para criação de novas sindicâncias será implementada nas próximas fases,
            focada em otimização de investigações.
          </p>
        </div>
      </div>
    </div>
  )
}
