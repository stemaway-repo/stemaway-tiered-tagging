import { dasherize } from "@ember/string";
import { ajax } from "discourse/lib/ajax";

export default {
  setupComponent(attrs, component) {
    const model = attrs.model;
    console.log(model);
    ajax(`/tags.json`).then(({ extras }) => {
      const tagGroups = extras.tag_groups;
      const pathwayTagGroup = this.siteSettings.pathway_tag_group;

      const pathways = tagGroups.find((tg) => tg.name === pathwayTagGroup).tags;
      const pathwayLabels = pathways.map((tag) => tag.id);
      const skills = tagGroups
        .filter((tg) => pathwayLabels.includes(dasherize(tg.name)))
        .map((tg) => dasherize(tg.name));

      console.log("skills", skills);

      this.set("pathwayLabels", pathwayLabels);
    });
  },

  actions: {
    updatePathwayTags() {
      console.log("Pathway Tags Updated");
    },

    updateSkillTags() {
      console.log("Skill Tags Updated");
    },

    updateSubSkillTags() {
      console.log("Skill Tags Updated");
    },
  },
};
