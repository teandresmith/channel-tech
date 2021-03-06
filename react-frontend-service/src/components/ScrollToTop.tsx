import { useEffect } from 'react'
import { useLocation } from 'react-router'

type ScrollToTop = {
  children: any
}

const ScrollToTop = (props: ScrollToTop) => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return <>{props.children}</>
}

export default ScrollToTop
