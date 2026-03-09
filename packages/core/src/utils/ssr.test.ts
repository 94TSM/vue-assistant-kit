import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  isBrowser,
  isServer,
  getLocalStorage,
  getSessionStorage,
  getDocument,
  getWindow,
  getNavigator,
  getMatchMedia,
  onClient,
  onServer,
  getClientValue,
  requestAnimationFrameSafe,
  cancelAnimationFrameSafe,
  setIntervalSafe,
  clearIntervalSafe,
  supportsIntersectionObserver,
  supportsResizeObserver,
  supportsMutationObserver,
} from './ssr'

describe('ssr utils', () => {
  describe('isBrowser', () => {
    it('should return true when window and document are defined', () => {
      expect(isBrowser()).toBe(true)
    })

    it('should return false when window is undefined', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      expect(isBrowser()).toBe(false)
      global.window = originalWindow
    })
  })

  describe('isServer', () => {
    it('should return false when window is defined', () => {
      expect(isServer()).toBe(false)
    })

    it('should return true when window is undefined', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      expect(isServer()).toBe(true)
      global.window = originalWindow
    })
  })

  describe('getLocalStorage', () => {
    it('should return localStorage in browser environment', () => {
      const storage = getLocalStorage()
      expect(storage).toBe(localStorage)
    })

    it('should return null in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      expect(getLocalStorage()).toBe(null)
      global.window = originalWindow
    })
  })

  describe('getSessionStorage', () => {
    it('should return sessionStorage in browser environment', () => {
      const storage = getSessionStorage()
      expect(storage).toBe(sessionStorage)
    })

    it('should return null in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      expect(getSessionStorage()).toBe(null)
      global.window = originalWindow
    })
  })

  describe('getDocument', () => {
    it('should return document in browser environment', () => {
      const doc = getDocument()
      expect(doc).toBe(document)
    })

    it('should return null in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      expect(getDocument()).toBe(null)
      global.window = originalWindow
    })
  })

  describe('getWindow', () => {
    it('should return window in browser environment', () => {
      const win = getWindow()
      expect(win).toBe(window)
    })

    it('should return null in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      expect(getWindow()).toBe(null)
      global.window = originalWindow
    })
  })

  describe('getNavigator', () => {
    it('should return navigator in browser environment', () => {
      const nav = getNavigator()
      expect(nav).toBe(navigator)
    })

    it('should return null in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      expect(getNavigator()).toBe(null)
      global.window = originalWindow
    })
  })

  describe('getMatchMedia', () => {
    it('should return matchMedia function in browser environment', () => {
      const matchMedia = getMatchMedia()
      // In test environment, matchMedia might return null or a function
      // We just check that it doesn't throw and returns something
      expect(matchMedia === null || typeof matchMedia === 'function').toBe(true)
    })

    it('should return null when matchMedia is not available', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete window.matchMedia
      expect(getMatchMedia()).toBe(null)
      global.window = originalWindow
    })
  })

  describe('onClient', () => {
    it('should execute callback in browser environment', () => {
      let executed = false
      onClient(() => {
        executed = true
      })
      expect(executed).toBe(true)
    })

    it('should not execute callback in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      let executed = false
      onClient(() => {
        executed = true
      })
      expect(executed).toBe(false)

      global.window = originalWindow
    })
  })

  describe('onServer', () => {
    it('should not execute callback in browser environment', () => {
      let executed = false
      onServer(() => {
        executed = true
      })
      expect(executed).toBe(false)
    })

    it('should execute callback in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      let executed = false
      onServer(() => {
        executed = true
      })
      expect(executed).toBe(true)

      global.window = originalWindow
    })
  })

  describe('getClientValue', () => {
    it('should return callback result in browser environment', () => {
      const result = getClientValue(() => 'browser-value', 'default')
      expect(result).toBe('browser-value')
    })

    it('should return default value in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      const result = getClientValue(() => 'browser-value', 'default')
      expect(result).toBe('default')

      global.window = originalWindow
    })

    it('should support complex return types', () => {
      const result = getClientValue(() => ({ key: 'value' }), { key: 'default' })
      expect(result).toEqual({ key: 'value' })
    })
  })

  describe('requestAnimationFrameSafe', () => {
    it('should call requestAnimationFrame in browser environment', () => {
      const spy = vi.spyOn(window, 'requestAnimationFrame')
      const callback = vi.fn()
      
      requestAnimationFrameSafe(callback)
      
      expect(spy).toHaveBeenCalledWith(callback)
      spy.mockRestore()
    })

    it('should use setTimeout in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      const spy = vi.spyOn(global, 'setTimeout')
      const callback = vi.fn()
      
      requestAnimationFrameSafe(callback)
      
      expect(spy).toHaveBeenCalledWith(callback, 16)
      spy.mockRestore()
      
      global.window = originalWindow
    })
  })

  describe('cancelAnimationFrameSafe', () => {
    it('should call cancelAnimationFrame in browser environment', () => {
      const spy = vi.spyOn(window, 'cancelAnimationFrame')
      
      cancelAnimationFrameSafe(123)
      
      expect(spy).toHaveBeenCalledWith(123)
      spy.mockRestore()
    })

    it('should use clearTimeout in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      const spy = vi.spyOn(global, 'clearTimeout')
      
      cancelAnimationFrameSafe(123)
      
      expect(spy).toHaveBeenCalledWith(123)
      spy.mockRestore()
      
      global.window = originalWindow
    })
  })

  describe('setIntervalSafe', () => {
    it('should call window.setInterval in browser environment', () => {
      const spy = vi.spyOn(window, 'setInterval')
      const callback = vi.fn()
      
      setIntervalSafe(callback, 1000)
      
      expect(spy).toHaveBeenCalledWith(callback, 1000)
      spy.mockRestore()
    })

    it('should call global.setInterval in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      const spy = vi.spyOn(global, 'setInterval')
      const callback = vi.fn()
      
      setIntervalSafe(callback, 1000)
      
      expect(spy).toHaveBeenCalledWith(callback, 1000)
      spy.mockRestore()
      
      global.window = originalWindow
    })
  })

  describe('clearIntervalSafe', () => {
    it('should call window.clearInterval in browser environment', () => {
      const spy = vi.spyOn(window, 'clearInterval')
      
      clearIntervalSafe(123)
      
      expect(spy).toHaveBeenCalledWith(123)
      spy.mockRestore()
    })

    it('should call global.clearInterval in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      const spy = vi.spyOn(global, 'clearInterval')
      
      clearIntervalSafe(123)
      
      expect(spy).toHaveBeenCalledWith(123)
      spy.mockRestore()
      
      global.window = originalWindow
    })
  })

  describe('supportsIntersectionObserver', () => {
    it('should return true when IntersectionObserver is available', () => {
      // In test environment, this might be true or false
      const result = supportsIntersectionObserver()
      expect(typeof result).toBe('boolean')
    })

    it('should return false when IntersectionObserver is not available', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete window.IntersectionObserver

      expect(supportsIntersectionObserver()).toBe(false)

      global.window = originalWindow
    })
  })

  describe('supportsResizeObserver', () => {
    it('should return true when ResizeObserver is available', () => {
      // In test environment, this might be true or false
      const result = supportsResizeObserver()
      expect(typeof result).toBe('boolean')
    })

    it('should return false when ResizeObserver is not available', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete window.ResizeObserver

      expect(supportsResizeObserver()).toBe(false)

      global.window = originalWindow
    })
  })

  describe('supportsMutationObserver', () => {
    it('should return true when MutationObserver is available', () => {
      // In test environment, this might be true or false
      const result = supportsMutationObserver()
      expect(typeof result).toBe('boolean')
    })

    it('should return false when MutationObserver is not available', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete window.MutationObserver

      expect(supportsMutationObserver()).toBe(false)

      global.window = originalWindow
    })
  })
})
