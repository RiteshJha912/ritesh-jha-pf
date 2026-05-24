// Lightweight image preloader that runs during browser idle time
// Features:
// - requestIdleCallback with a setTimeout fallback
// - chunked loading to avoid blocking the main thread
// - respects Save-Data and slow network hints
// - deduplicates requests across app lifetime

const preloaded = new Set()

function isSlowNetwork() {
  try {
    if (navigator.connection) {
      const conn = navigator.connection
      if (conn.saveData) return true
      const slowTypes = ['2g']
      if (conn.effectiveType && slowTypes.includes(conn.effectiveType))
        return true
    }
  } catch (e) {}
  return false
}

function scheduleIdle(cb, opts = {}) {
  if (typeof window === 'undefined') return () => {}
  const timeout = opts.timeout || 2000
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(cb, { timeout })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(cb, 1000)
  return () => clearTimeout(id)
}

export function startPreloading(images = [], options = {}) {
  // options: {batchSize}
  if (!Array.isArray(images) || images.length === 0) return () => {}

  if (isSlowNetwork()) {
    // Do not preload aggressively on slow networks / save-data
    // but still attempt a minimal preload of the first image
    images = images.slice(0, 2)
  }

  const batchSize = options.batchSize || 4
  let cancelled = false

  const work = (deadline) => {
    if (cancelled) return
    let i = 0
    while (i < batchSize && images.length > 0) {
      const url = images.shift()
      if (!url) break
      if (preloaded.has(url)) {
        i++
        continue
      }
      try {
        const img = new Image()
        img.src = url
        // best-effort handlers to mark as preloaded
        img.onload = () => preloaded.add(url)
        img.onerror = () => preloaded.add(url)
      } catch (e) {
        preloaded.add(url)
      }
      i++
    }

    if (images.length > 0 && !cancelled) {
      // schedule next chunk without blocking
      scheduleIdle(() => work && work({ timeRemaining: () => 0 }))
    }
  }

  // Kick off during idle time after a couple of frames
  const cancelSchedule = scheduleIdle(
    () => work && work({ timeRemaining: () => 0 }),
    { timeout: 3000 },
  )

  return () => {
    cancelled = true
    try {
      cancelSchedule()
    } catch (e) {}
  }
}

export function isPreloaded(url) {
  return preloaded.has(url)
}

export default startPreloading
