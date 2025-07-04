export interface User {
  id: string
  username: string
  email: string
  createdAt: string
  totalOmikuji: number
  favoriteCategory?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

const USERS_STORAGE_KEY = 'omikuji-users'
const CURRENT_USER_KEY = 'omikuji-current-user'

// ユーザーデータを取得
export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('ユーザーデータの取得に失敗しました:', error)
    return []
  }
}

// ユーザーデータを保存
export const saveUsers = (users: User[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

// 現在のユーザーを取得
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('現在のユーザー情報の取得に失敗しました:', error)
    return null
  }
}

// 現在のユーザーを設定
export const setCurrentUser = (user: User | null): void => {
  if (typeof window === 'undefined') return
  
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

// メールアドレスの重複チェック
export const isEmailExists = (email: string): boolean => {
  const users = getUsers()
  return users.some(user => user.email.toLowerCase() === email.toLowerCase())
}

// ユーザー名の重複チェック
export const isUsernameExists = (username: string): boolean => {
  const users = getUsers()
  return users.some(user => user.username.toLowerCase() === username.toLowerCase())
}

// 新規ユーザー登録
export const registerUser = (data: RegisterData): { success: boolean; message: string; user?: User } => {
  try {
    // バリデーション
    if (!data.username || data.username.length < 2) {
      return { success: false, message: 'ユーザー名は2文字以上で入力してください' }
    }
    
    if (!data.email || !isValidEmail(data.email)) {
      return { success: false, message: '有効なメールアドレスを入力してください' }
    }
    
    if (!data.password || data.password.length < 6) {
      return { success: false, message: 'パスワードは6文字以上で入力してください' }
    }
    
    // 重複チェック
    if (isEmailExists(data.email)) {
      return { success: false, message: 'このメールアドレスは既に登録されています' }
    }
    
    if (isUsernameExists(data.username)) {
      return { success: false, message: 'このユーザー名は既に使用されています' }
    }
    
    // 新しいユーザーを作成
    const newUser: User = {
      id: Date.now().toString(),
      username: data.username,
      email: data.email,
      createdAt: new Date().toISOString(),
      totalOmikuji: 0
    }
    
    // ユーザーリストに追加
    const users = getUsers()
    users.push(newUser)
    saveUsers(users)
    
    // パスワードは別途保存（実際のアプリではハッシュ化が必要）
    const passwords = getPasswords()
    passwords[newUser.id] = data.password
    savePasswords(passwords)
    
    // 新規登録後に自動的にログイン状態にする
    setCurrentUser(newUser)
    
    return { success: true, message: '登録が完了しました', user: newUser }
  } catch (error) {
    console.error('ユーザー登録エラー:', error)
    return { success: false, message: '登録中にエラーが発生しました' }
  }
}

// ログイン
export const loginUser = (credentials: LoginCredentials): { success: boolean; message: string; user?: User } => {
  try {
    const users = getUsers()
    const user = users.find(u => u.email.toLowerCase() === credentials.email.toLowerCase())
    
    if (!user) {
      return { success: false, message: 'メールアドレスまたはパスワードが間違っています' }
    }
    
    const passwords = getPasswords()
    if (passwords[user.id] !== credentials.password) {
      return { success: false, message: 'メールアドレスまたはパスワードが間違っています' }
    }
    
    setCurrentUser(user)
    return { success: true, message: 'ログインしました', user }
  } catch (error) {
    console.error('ログインエラー:', error)
    return { success: false, message: 'ログイン中にエラーが発生しました' }
  }
}

// ログアウト
export const logoutUser = (): void => {
  setCurrentUser(null)
}

// ユーザー情報を更新
export const updateUser = (updatedUser: User): void => {
  const users = getUsers()
  const index = users.findIndex(u => u.id === updatedUser.id)
  if (index !== -1) {
    users[index] = updatedUser
    saveUsers(users)
    setCurrentUser(updatedUser)
  }
}

// おみくじ回数を増加
export const incrementOmikujiCount = (userId: string): void => {
  const users = getUsers()
  const user = users.find(u => u.id === userId)
  if (user) {
    user.totalOmikuji += 1
    updateUser(user)
  }
}

// パスワード管理（実際のアプリでは適切な暗号化が必要）
const PASSWORDS_KEY = 'omikuji-passwords'

const getPasswords = (): Record<string, string> => {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem(PASSWORDS_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

const savePasswords = (passwords: Record<string, string>): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords))
}

// メールアドレスのバリデーション
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}