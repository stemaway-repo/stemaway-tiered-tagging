import {
  prepareData,
  resetProperties,
  setPathwayProps,
  setSkillProps,
} from "../../lib/skill-property-helpers";

export default {
  shouldRender(args, component) {
    return component.siteSettings.stemaway_tiered_tagging_enabled;
  },

  // eslint-disable-next-line no-unused-vars
  setupComponent(args, component) {
    prepareData(this);
  },

  actions: {
    updatePathwayTags(selected) {
      // If selected pathway is removed:
      if (selected.length < 1) {
        resetProperties(this.model, this);
      }

      this.model.set("pathway", selected);
      setPathwayProps(this, this.pathways, selected);
    },

    updateSkillTags(selected) {
      this.model.set("skill", selected);
      setSkillProps(this, this.skills, selected);
    },

    updateSubSkillTags(selected) {
      this.model.set("subSkill", selected);
    },
  },
};
