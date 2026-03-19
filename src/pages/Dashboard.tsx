export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Operational Dashboard (main page)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-card border rounded-2xl shadow-sm">
            <h3 className="font-semibold text-muted-foreground text-sm mb-2 uppercase">
              Métrica {i}
            </h3>
            <div className="text-4xl font-bold text-primary">000</div>
          </div>
        ))}
      </div>
    </div>
  )
}
