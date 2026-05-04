import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll, vi } from 'vitest';
import { server } from './mocks/server';

// --- POLYFILLS PARA RADIX UI & JSDOM ---

// 1. PointerEvent: Vital para que Radix detecte clics en Menús y Modales
if (!window.PointerEvent) {
  class PointerEvent extends MouseEvent {
    constructor(type: string, props: PointerEventInit = {}) {
      super(type, props);
      (this as any).pointerId = props.pointerId || 0;
      (this as any).pointerType = props.pointerType || '';
    }
  }
  window.PointerEvent = PointerEvent as any;
}

// 2. ResizeObserver: Necesario para componentes que calculan su tamaño (como los Dropdowns)
globalThis.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// 3. matchMedia: Necesario si usas temas (Dark/Light) o componentes responsivos
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecado
    removeListener: vi.fn(), // Deprecado
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// --- CICLO DE VIDA DE MSW ---

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());