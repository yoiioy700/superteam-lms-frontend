import { Course, Lesson } from '@/types';
import { MOCK_COURSES } from '../data/mockCourses';

class ContentService {
    /**
     * Fetch all available courses
     */
    async getCourses(): Promise<Course[]> {
        return MOCK_COURSES;
    }

    /**
     * Fetch a specific course by its slug or ID
     */
    async getCourseById(courseId: string): Promise<Course | null> {
        return MOCK_COURSES.find(c => c.id === courseId) || null;
    }

    /**
     * Fetch a specific lesson inside a course
     */
    async getLesson(courseId: string, lessonId: string): Promise<Lesson | null> {
        const course = await this.getCourseById(courseId);
        if (!course) return null;

        for (const mod of course.modules) {
            const lesson = mod.lessons.find(l => l.id === lessonId);
            if (lesson) return lesson;
        }
        return null;
    }
}

export const contentService = new ContentService();
