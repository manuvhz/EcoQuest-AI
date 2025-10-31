// store/ecoTips.ts
import { ref } from 'vue';
import { api } from '../api';
import type { EcoTip } from '../types';

// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export const ecoTips = ref<EcoTip[]>([]);
export const isLoadingEcoTips = ref(false);
let areEcoTipsLoaded = false;

export async function fetchEcoTips(force = false) {
    if (areEcoTipsLoaded && !force) return;
    isLoadingEcoTips.value = true;
    try {
        ecoTips.value = await api.getEcoTips();
        areEcoTipsLoaded = true;
    } catch (error) {
        console.error("Failed to fetch eco-tips:", error);
    } finally {
        isLoadingEcoTips.value = false;
    }
}
