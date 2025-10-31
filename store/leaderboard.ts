// store/leaderboard.ts
import { ref } from 'vue';
import { api } from '../api';
import type { LeaderboardUser } from '../types';

// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export const leaderboardData = ref<LeaderboardUser[]>([]);
export const isLoadingLeaderboard = ref(false);

export async function fetchLeaderboard(force = false) {
    if (isLoadingLeaderboard.value && !force) return;
    isLoadingLeaderboard.value = true;
    try {
        leaderboardData.value = await api.getLeaderboard();
    } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
    } finally {
        isLoadingLeaderboard.value = false;
    }
}
