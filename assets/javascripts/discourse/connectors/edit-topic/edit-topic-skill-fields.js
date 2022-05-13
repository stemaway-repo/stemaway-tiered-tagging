export default {
  shouldRender(args, component) {
    return component.siteSettings.stemaway_tiered_tagging_enabled;
  },

  setupComponent(args, component) {},

  actions: {
    updatePathwayTags(pathway) {},

    updateSkillTags(skill) {},

    updateSubSkillTags(subSkill) {},

    updateOtherTags(otherTags) {},
  },
};
