import Link from "../navigation/Link"

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Pagina de ejemplo para React Router</p>
      <Link to='/about'>About</Link>
    </>
  )
}