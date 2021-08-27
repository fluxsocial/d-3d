import type { Address, Language, HolochainLanguageDelegate, LanguageContext, Interaction} from "@perspect3vism/ad4m";
import ThreeDAdapter from "./adapter";
import ThreeDAdapterAuthorAdapter from "./authorAdapter";
import Icon from "./build/Icon.js";
import ConstructorIcon from "./build/ConstructorIcon.js";
import { ThreeDSettingsUI } from "./SettingsUI";
import { ThreeDExpressionUI } from "./expressionUI";
import { DNA, DNA_NICK } from "./dna";

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
  const Holochain = context.Holochain as HolochainLanguageDelegate;
  await Holochain.registerDNAs([{ file: DNA, nick: DNA_NICK }]);

  const expressionAdapter = new ThreeDAdapter(context);
  const authorAdaptor = new ThreeDAdapterAuthorAdapter(context);
  const settingsUI = new ThreeDSettingsUI();
  const expressionUI = new ThreeDExpressionUI();

  return {
    name,
    expressionAdapter,
    authorAdaptor,
    iconFor,
    constructorIcon,
    interactions,
    settingsUI,
    expressionUI,
  } as Language;
}
