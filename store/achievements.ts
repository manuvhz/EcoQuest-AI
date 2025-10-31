// store/achievements.ts
import { ref } from 'vue';
import { api } from '../api';
import type { Achievement } from '../types';

// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export const achievements = ref<Achievement[]>([]);
export const isLoadingAchievements = ref(false);
let areAchievementsLoaded = false;

export async function fetchAchievements(force = false) {
    if (areAchievementsLoaded && !force) return;
    isLoadingAchievements.value = true;
    try {
        achievements.value = await api.getAchievements();
        areAchievementsLoaded = true;
    } catch (error) {
        console.error("Failed to fetch achievements:", error);
    } finally {
        isLoadingAchievements.value = false;
    }
}
