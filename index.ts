import type { Address, Language, HolochainLanguageDelegate, LanguageContext, Interaction} from "@perspect3vism/ad4m";
import ThreeDAdapter from "./adapter";
import Icon from "./build/Icon.js";
import ConstructorIcon from "./build/ConstructorIcon.js";
import { ThreeDSettingsUI } from "./SettingsUI";
import { ThreeDExpressionUI } from "./expressionUI";

function iconFor(expression: Address): string {
  return Icon;
}

function constructorIcon(): string {
  return ConstructorIcon;
}

function interactions(expression: Address): Interaction[] {
  return [];
}

export const name = "d-3d";

export default async function create(context: LanguageContext): Promise<Language> {

  const expressionAdapter = new ThreeDAdapter(context);
  const settingsUI = new ThreeDSettingsUI();
  const expressionUI = new ThreeDExpressionUI();

  return {
    name,
    expressionAdapter,
    iconFor,
    constructorIcon,
    interactions,
    settingsUI,
    expressionUI,
  } as Language;
}
