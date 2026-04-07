import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
  type Unsubscribe,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import type { AuthUser, LoginCredentials, RegisterCredentials } from '../types/auth.types'

function mapFirebaseUser(firebaseUser: User): AuthUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email ?? '',
    displayName: firebaseUser.displayName,
  }
}

export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  const { user } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
  return mapFirebaseUser(user)
}

export async function register(credentials: RegisterCredentials): Promise<AuthUser> {
  const { user } = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
  await updateProfile(user, { displayName: credentials.displayName })
  return mapFirebaseUser(user)
}

export async function logout(): Promise<void> {
  await signOut(auth)
}

export function onAuthChange(callback: (user: AuthUser | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, (firebaseUser) => {
    callback(firebaseUser ? mapFirebaseUser(firebaseUser) : null)
  })
}
