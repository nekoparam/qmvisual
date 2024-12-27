/**
 * 检查用户令牌的有效性
 * @returns {boolean} 如果令牌有效返回 true，否则返回 false
 */
export function checkTokenValidity(): boolean {
  try {
    const token = localStorage.getItem('@qmauth/token')
    
    if (!token) {
      return false
    }

    // 这里可以添加更多的token验证逻辑
    // 比如检查token是否过期，格式是否正确等
    
    return true
  } catch (error) {
    console.error('Token validation error:', error)
    return false
  }
} 