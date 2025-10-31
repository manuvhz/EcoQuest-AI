// store/challenges.ts
import { ref } from 'vue';
import { api } from '../api';
import type { Challenge } from '../types';

// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export const challenges = ref<Challenge[]>([]);
export const isLoadingChallenges = ref(false);
let areChallengesLoaded = false;

export async function fetchChallenges(force = false) {
    if (areChallengesLoaded && !force) return;
    isLoadingChallenges.value = true;
    try {
        challenges.value = await api.getChallenges();
        areChallengesLoaded = true;
    } catch (error) {
        console.error("Failed to fetch challenges:", error);
    } finally {
        isLoadingChallenges.value = false;
    }
}
