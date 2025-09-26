import { supabase } from '@/lib/supabase'

export interface LevelInfo {
  level: number
  xpToNextLevel: number
  levelProgress: number // 0-100
}

// Leveling: base 500 XP for level 1->2, with 1.2x multiplier each level
export function calculateLevel(totalXP: number): LevelInfo {
  let level = 1
  let xpForLevel = 0
  let xpRequired = 500

  while (xpForLevel + xpRequired <= totalXP) {
    xpForLevel += xpRequired
    level++
    xpRequired = Math.floor(500 * Math.pow(1.2, level - 1))
  }

  const currentLevelXP = totalXP - xpForLevel
  const xpToNextLevel = Math.max(xpRequired - currentLevelXP, 0)
  const levelProgress = Math.min(100, Math.max(0, (currentLevelXP / xpRequired) * 100))

  return { level, xpToNextLevel, levelProgress }
}

export async function awardXP(userId: string, amount: number, options?: { reason?: string; awardCoins?: boolean }) {
  const safeAmount = Math.max(0, Math.floor(amount))
  if (safeAmount === 0) return { error: null }

  // Fetch current profile to get current XP/coins
  const { data: current, error: fetchErr } = await supabase
    .from('profiles')
    .select('id,total_xp,eco_coins')
    .eq('id', userId)
    .single()

  if (fetchErr || !current) {
    return { error: fetchErr || 'Profile not found' }
  }

  const newTotalXp = (current.total_xp || 0) + safeAmount
  const coinsGain = options?.awardCoins ? Math.ceil(safeAmount / 10) : 0
  const newCoins = (current.eco_coins || 0) + coinsGain
  const lvl = calculateLevel(newTotalXp)

  const { error: updateErr } = await supabase
    .from('profiles')
    .update({
      total_xp: newTotalXp,
      eco_coins: newCoins,
      level: lvl.level,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (updateErr) return { error: updateErr }
  return { error: null, total_xp: newTotalXp, eco_coins: newCoins, level: lvl.level }
}
