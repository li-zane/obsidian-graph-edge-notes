import { App, PluginSettingTab, Setting } from "obsidian";
import type GraphEdgeNotesPlugin from "./main";
import { t } from "./i18n";

export class GraphEdgeNotesSettingTab extends PluginSettingTab {
  constructor(app: App, private readonly plugin: GraphEdgeNotesPlugin) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    const i18n = t();
    containerEl.empty();

    new Setting(containerEl).setName(i18n.settingsTitleData).setHeading();

    new Setting(containerEl)
      .setName(i18n.relationPropertyName)
      .setDesc(i18n.relationPropertyDesc)
      .addText((text) => {
        text
          .setPlaceholder("Relations")
          .setValue(this.plugin.settings.relationProperty)
          .onChange(async (value) => {
            this.plugin.settings.relationProperty = value.trim() || "relations";
            await this.plugin.saveSettings();
            this.plugin.refreshGraphOverlay("relation property changed", true);
          });
      });

    new Setting(containerEl).setName(i18n.settingsTitleFilter).setHeading();

    new Setting(containerEl)
      .setName(i18n.showInGlobalGraphName)
      .setDesc(i18n.showInGlobalGraphDesc)
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.enableGlobalGraph).onChange(async (value) => {
          this.plugin.settings.enableGlobalGraph = value;
          await this.plugin.saveSettings();
          this.plugin.refreshGraphOverlay();
        });
      });

    new Setting(containerEl)
      .setName(i18n.showInLocalGraphName)
      .setDesc(i18n.showInLocalGraphDesc)
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.enableLocalGraph).onChange(async (value) => {
          this.plugin.settings.enableLocalGraph = value;
          await this.plugin.saveSettings();
          this.plugin.refreshGraphOverlay();
        });
      });

    new Setting(containerEl)
      .setName(i18n.showAnnotationsName)
      .setDesc(i18n.showAnnotationsDesc)
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.showLabels).onChange(async (value) => {
          this.plugin.settings.showLabels = value;
          await this.plugin.saveSettings();
          this.plugin.refreshGraphOverlay("annotation visibility changed", true);
        });
      });

    new Setting(containerEl).setName(i18n.settingsTitleAppearance).setHeading();

    new Setting(containerEl)
      .setName(i18n.showDetailOnHoverName)
      .setDesc(i18n.showDetailOnHoverDesc)
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.showTooltip).onChange(async (value) => {
          this.plugin.settings.showTooltip = value;
          await this.plugin.saveSettings();
          this.plugin.refreshGraphOverlay();
        });
      });

    new Setting(containerEl)
      .setName(i18n.labelFontSizeName)
      .setDesc(i18n.labelFontSizeDesc)
      .addSlider((slider) => {
        slider
          .setLimits(0.6, 1.8, 0.05)
          .setValue(this.plugin.settings.labelSizeRatio)
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.labelSizeRatio = value;
            await this.plugin.saveSettings();
            this.plugin.refreshGraphOverlay();
          });
      });

    new Setting(containerEl)
      .setName(i18n.labelOpacityName)
      .setDesc(i18n.labelOpacityDesc)
      .addSlider((slider) => {
        slider
          .setLimits(0.2, 1, 0.05)
          .setValue(this.plugin.settings.labelOpacity)
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.labelOpacity = value;
            await this.plugin.saveSettings();
            this.plugin.refreshGraphOverlay();
          });
      });

    new Setting(containerEl)
      .setName(i18n.labelColorName)
      .setDesc(i18n.labelColorDesc)
      .addText((text) => {
        text
          .setPlaceholder("#7c3aed")
          .setValue(this.plugin.settings.defaultLabelColor)
          .onChange(async (value) => {
            this.plugin.settings.defaultLabelColor = value.trim();
            await this.plugin.saveSettings();
            this.plugin.refreshGraphOverlay();
          });
      });

    new Setting(containerEl).setName(i18n.settingsTitleAdvanced).setHeading();

    new Setting(containerEl)
      .setName(i18n.edgeRescanName)
      .setDesc(i18n.edgeRescanDesc)
      .addSlider((slider) => {
        slider
          .setLimits(5, 60, 1)
          .setValue(this.plugin.settings.rebuildEveryNFrames)
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.rebuildEveryNFrames = value;
            await this.plugin.saveSettings();
            this.plugin.refreshGraphOverlay();
          });
      });

    new Setting(containerEl)
      .setName(i18n.debugModeName)
      .setDesc(i18n.debugModeDesc)
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.debugMode).onChange(async (value) => {
          this.plugin.settings.debugMode = value;
          await this.plugin.saveSettings();
          await this.plugin.handleDebugModeChange();
        });
      });
  }
}
