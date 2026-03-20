export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-4 motorsport-card rounded-lg p-8 text-center">
        <div className="text-6xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Página no encontrada</h1>
        <p className="text-muted-foreground mb-8">
          Esta ruta no existe. Pero tenemos rutas mucho mejores esperándote.
        </p>
        <a
          href="/"
          className="inline-block bg-primary hover:bg-accent text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          <i className="fas fa-home mr-2"></i>
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
