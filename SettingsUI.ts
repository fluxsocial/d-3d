import type { SettingsUI } from "@perspect3vism/ad4m";
import SettingsIcon from './build/SettingsIcon.js';

export class ThreeDSettingsUI implements SettingsUI {
    settingsIcon(): string {
        return SettingsIcon
    }
}