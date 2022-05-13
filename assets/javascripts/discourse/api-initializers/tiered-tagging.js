import discourseComputed from "discourse-common/utils/decorators";
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.2.0", (api) => {
  const PLUGIN_ID = "stemaway-tiered-tagging";

  const FIELDS = [
    { name: "pathway", type: "json" },
    { name: "skill", type: "json" },
    { name: "subSkill", type: "json" },
    { name: "otherTags", type: "json" },
  ];

  api.modifyClass("controller:composer", {
    pluginId: PLUGIN_ID,

    @discourseComputed("model")
    pathwayValidation() {
      // TODO ?
    },
  });

  api.modifyClass("model:composer", {
    pluginId: PLUGIN_ID,
    // eslint-disable-next-line no-unused-vars
    save(opts) {
      const pathway = this.pathway;
      const skill = this.skill;
      const subSkill = this.subSkill;
      const tags = this.tags;

      const addToTags = [];

      if (tags) {
        this.otherTags = tags;
        addToTags.push(...tags);
      }

      if (pathway) {
        addToTags.push(...pathway);
      }

      if (skill) {
        addToTags.push(...skill);
      }

      if (subSkill) {
        addToTags.push(...subSkill);
      }

      this.set("tags", addToTags);

      return this._super(...arguments);
    },
  });

  api.modifyClass("controller:topic", {
    pluginId: PLUGIN_ID,

    actions: {
      finishedEditingTopic() {
        const pathwayTags = this.buffered.get("pathway") || [];
        const skillTags = this.buffered.get("skill") || [];
        const subSkillTags = this.buffered.get("subSkill") || [];
        const otherTags = this.buffered.get("otherTags") || [];

        const allTags = [
          ...pathwayTags,
          ...skillTags,
          ...subSkillTags,
          ...otherTags,
        ];

        this.buffered.set("tags", allTags);
        return this._super(...arguments);
      },
    },
  });

  FIELDS.forEach((field) => {
    api.serializeOnCreate(field.name);
    api.serializeToDraft(field.name);
    api.serializeToTopic(field.name, `topic.${field.name}`);
  });
});
