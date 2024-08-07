
export const NAV_EVENT = "pushstate"

export function navigate(href) {
  window.history.pushState({}, '', href)
  const navEvent = new Event(NAV_EVENT)
  window.dispatchEvent(navEvent)
}

export default function Link({ target, to, ...props }) {
  function handleNavigation(e) {
    const isTargetSelf = target == undefined || target == "_self"
    const isEventWithKey = e.metaKey || e.ctrlKey || e.altKey || e.shiftKey
    const isMainClick = e.button == 0

    if (isTargetSelf && isMainClick && !isEventWithKey) {
      e.preventDefault()
      navigate(to)
      window.scrollTo(0, 0)
    }
  }

  return <a target={target} href={to} onClick={handleNavigation} {...props} />
}