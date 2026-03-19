export default function Processos() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Processos</h1>
        <p className="text-muted-foreground mt-1">Process Details</p>
      </div>

      <div className="bg-card border rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground text-sm">Nenhum processo listado ainda.</p>
      </div>
    </div>
  )
}
