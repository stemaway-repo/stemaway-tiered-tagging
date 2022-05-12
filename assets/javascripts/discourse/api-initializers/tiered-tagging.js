import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.2.0", (api) => {
  const PLUGIN_ID = "stemaway-tiered-tagging";
  const siteSettings = api.container.lookup("site-settings:main");
  const FIELDS = [
    { name: "pathway", type: "json" },
    { name: "skill", type: "json" },
    { name: "subSkill", type: "json" },
    { name: "otherTags", type: "json" },
  ];

  api.modifyClass("controller:composer", {
    pluginId: PLUGIN_ID,
  });

  api.modifyClass("model:composer", {
    pluginId: PLUGIN_ID,

    save(opts) {
      console.group("model:composer");
      console.log("this", this);
      console.log("pathway", this.pathway);
      console.log("skill", this.skill);
      console.log("subSkill", this.subSkill);
      console.groupEnd();

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
        console.log("called");
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

  FIELDS.forEach((field) => {
    api.serializeOnCreate(field.name);
    api.serializeToDraft(field.name);
    api.serializeToTopic(field.name, `topic.${field.name}`);
  });
});
