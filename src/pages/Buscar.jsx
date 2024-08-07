import { useEffect } from "react";


export default function Buscar({ routeParams }) {
  useEffect(() => {
    document.title = routeParams.query
  }, [])

  return (
    <div>
      <h1>Estás buscando: {routeParams.query}</h1>
    </div>
  )
}