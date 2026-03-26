import { ButtonComponent, Modal, Notice, Setting, TextComponent } from "obsidian";
import { RelationStore } from "../relationStore";
import { RelationInput, ResolvedRelation } from "../types";

interface RelationEditorModalOptions {
  sourcePath: string;
  relation?: ResolvedRelation;
  onComplete?: () => void;
}

export class RelationEditorModal extends Modal {
  private targetValue: string;
  private labelValue: string;
  private detailValue: string;
  private targetInput!: TextComponent;
  private labelInput!: TextComponent;
  private detailEl!: HTMLTextAreaElement;

  constructor(private readonly store: RelationStore, private readonly options: RelationEditorModalOptions) {
    super(store.getApp());
    this.targetValue = options.relation ? store.getCleanTargetInput(options.relation.target) : "";
    this.labelValue = options.relation?.label ?? "";
    this.detailValue = options.relation?.detail ?? "";
  }

  onOpen(): void {
    const { contentEl } = this;
    const isEdit = Boolean(this.options.relation);
    contentEl.empty();

    this.titleEl.setText(isEdit ? "Edit graph relation" : "Add graph relation");
    contentEl.createEl("p", {
      cls: "graph-edge-notes-help",
      text: `Store each relation as a list item in frontmatter under \`${this.store.getRelationPropertyName()}\`, using ("label")[[target]]. Add ("detail") after the link only when you want hover detail text.`
    });

    new Setting(contentEl)
      .setName("Target note")
      .setDesc("Note name or wiki target to connect to.")
      .addText((text) => {
        this.targetInput = text;
        text.setPlaceholder("Open").setValue(this.targetValue).onChange((value) => {
          this.targetValue = value;
        });
      });

    new Setting(contentEl)
      .setName("Edge label")
      .setDesc("Short text shown directly on the graph edge.")
      .addText((text) => {
        this.labelInput = text;
        text.setPlaceholder("Gossip").setValue(this.labelValue).onChange((value) => {
          this.labelValue = value;
        });
      });

    new Setting(contentEl)
      .setName("Detail")
      .setDesc('Optional hover detail text. If left empty, the relation will be saved as ("label")[[target]] without the trailing ("detail") part.');

    this.detailEl = contentEl.createEl("textarea", { cls: "graph-edge-notes-textarea" });
    this.detailEl.value = this.detailValue;
    this.detailEl.addEventListener("input", () => {
      this.detailValue = this.detailEl.value;
    });

    const actionsEl = contentEl.createDiv({ cls: "graph-edge-notes-modal-actions" });

    if (isEdit) {
      new ButtonComponent(actionsEl).setButtonText("Delete").setWarning().onClick(async () => {
        await this.handleDelete();
      });
    }

    new ButtonComponent(actionsEl).setButtonText("Cancel").onClick(() => this.close());
    new ButtonComponent(actionsEl).setButtonText(isEdit ? "Save" : "Add").setCta().onClick(async () => {
      await this.handleSave();
    });
  }

  private async handleSave(): Promise<void> {
    const relation: RelationInput = {
      target: this.targetValue,
      label: this.labelValue,
      detail: this.detailValue
    };

    try {
      if (this.options.relation) {
        await this.store.updateRelation(this.options.sourcePath, this.options.relation.index, relation);
        new Notice("Graph relation updated");
      } else {
        await this.store.addRelation(this.options.sourcePath, relation);
        new Notice("Graph relation added");
      }

      this.options.onComplete?.();
      this.close();
    } catch (error) {
      this.store.notifySaveError(error);
    }
  }

  private async handleDelete(): Promise<void> {
    if (!this.options.relation) {
      return;
    }

    try {
      await this.store.deleteRelation(this.options.sourcePath, this.options.relation.index);
      new Notice("Graph relation removed");
      this.options.onComplete?.();
      this.close();
    } catch (error) {
      this.store.notifySaveError(error);
    }
  }
}
