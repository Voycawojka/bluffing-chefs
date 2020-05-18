import config from '../shared/config'

type firstArg = 'config' | 'event'
type secondArg = string
type props = { page_path?: string, page_title?: string }

declare const gtag: (firstArg: firstArg, secondArg: secondArg, props?: props) => void

export function registerPageView(title?: string) {
    gtag('config', config.trackingId, { page_path: window.location.pathname, page_title: title })
}

export function registerVirtualPageView(title: string) {
    gtag('config', config.trackingId, { page_title: title })
}

export function registerEvent(event: string)  {
    gtag('event', event)
}
