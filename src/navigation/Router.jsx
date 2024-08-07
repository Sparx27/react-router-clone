import { useEffect, useState, Children } from "react"
import { NAV_EVENT } from "./Link"
import { match } from "path-to-regexp"


//Funcion de prueba para hacer algo parecido al match de path-to-regexp
/* function matchear(href) {
  let regex = /\/:query/g
  if (!regex.test(href)) return null

  let sectoresHref = href.substring(1).split("/")
  sectoresHref = sectoresHref.filter(s => s.trim() != "")
  const indiceQuery = sectoresHref.findIndex(s => /:query/.test(s))

  let urlActual = window.location.pathname.substring(1)
  let sectores = urlActual.split("/")
  sectores = sectores.filter(s => s.trim() != "")

  return {
    query: sectores[indiceQuery]
  }
} */

export default function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [pathname, setPathName] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setPathName(window.location.pathname)
    }
    window.addEventListener(NAV_EVENT, onLocationChange)
    window.addEventListener('popstate', onLocationChange)

    return () => {
      window.removeEventListener(NAV_EVENT, onLocationChange)
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])

  //Array(children) para el escenario en que solo tenga 1 children
  const routesFromChildren = Children.map(Array(children), ({ props, type }) => {
    if (type.name !== "Route") return null
    return { path: props.path, Component: props.Component }
  })

  let routeParams = {}
  const FindComponent = routes.concat(routesFromChildren).find(({ path }) => {
    if (path == pathname) {
      return true
    }

    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(pathname)
    if (!matched) {
      return false
    }

    routeParams = matched.params
    return true
  })?.Component

  return FindComponent ? <FindComponent routeParams={routeParams} /> : <DefaultComponent />
}