import { http, HttpResponse } from 'msw';

export const handlers = [
  // Ejemplo: Interceptar el login de Firebase
  http.post('https://identitytoolkit.googleapis.com/*', () => {
    return HttpResponse.json({
      idToken: 'fake-token',
      email: 'test@mentor.com',
      refreshToken: 'fake-refresh',
      expiresIn: '3600',
      localId: 'user-123'
    });
  }),
];