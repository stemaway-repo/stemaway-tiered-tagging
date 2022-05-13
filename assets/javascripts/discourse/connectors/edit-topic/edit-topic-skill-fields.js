import { prepareData } from "../../lib/skill-property-helpers";

export default {
  shouldRender(args, component) {
    return component.siteSettings.stemaway_tiered_tagging_enabled;
  },

  setupComponent(args, component) {
    prepareData(component);
  },

  actions: {
    // eslint-disable-next-line no-unused-vars
    updatePathwayTags(pathway) {
      // TODO
    },

    // eslint-disable-next-line no-unused-vars
    updateSkillTags(skill) {
      // TODO
    },

    // eslint-disable-next-line no-unused-vars
    updateSubSkillTags(subSkill) {
      // TODO
    },

    // eslint-disable-next-line no-unused-vars
    updateOtherTags(otherTags) {
      // TODO
    },
  },
};
