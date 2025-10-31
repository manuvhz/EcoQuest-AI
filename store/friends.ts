// store/friends.ts
import { ref } from 'vue';
import { api } from '../api';
import type { Friend } from '../types';

// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export const friendsData = ref<Friend[]>([]);
export const isLoadingFriends = ref(false);

export async function fetchFriends(force = false) {
    if (isLoadingFriends.value && !force) return;
    isLoadingFriends.value = true;
    try {
        friendsData.value = await api.getFriends();
    } catch (error) {
        console.error("Failed to fetch friends:", error);
    } finally {
        isLoadingFriends.value = false;
    }
}
