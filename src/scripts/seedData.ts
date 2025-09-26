import { courseService } from '@/services/courseService'

export async function seedInitialData() {
  try {
    console.log('🌱 Seeding initial course data...')
    await courseService.seedCourses()
    console.log('✅ Initial course data seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    throw error
  }
}

// Export for manual execution
// You can call seedInitialData() from your app when needed
