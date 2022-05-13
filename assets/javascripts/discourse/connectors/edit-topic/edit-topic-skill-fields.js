import {
  prepareData,
  resetProperties,
  setPathwayProps,
  setSkillProps,
  updateDependantDropdowns,
} from "../../lib/skill-property-helpers";

export default {
  shouldRender(args, component) {
    return component.siteSettings.stemaway_tiered_tagging_enabled;
  },

  setupComponent(args, component) {
    prepareData(component);
  },

  actions: {
    updatePathwayTags(selected) {
      this.set("buffered.pathway", selected);

      if (selected.length < 1) {
        resetProperties(this.buffered, this);
      } else {
        setPathwayProps(this, this.pathways, selected);
        updateDependantDropdowns(
          this,
          this.get("buffered.skill"),
          this.get("skills"),
          "updateSkillTags"
        );
      }
    },

    updateSkillTags(selected) {
      this.set("buffered.skill", selected);

      if (selected.length < 1) {
        this.buffered.set("subSkill", null);
        return this.set("showSubSkills", false);
      } else {
        setSkillProps(this, this.skills, selected);
        updateDependantDropdowns(
          this,
          this.get("buffered.subSkill"),
          this.get("subSkills"),
          "updateSubSkillTags"
        );
      }
    },

    updateSubSkillTags(selected) {
      this.set("buffered.subSkill", selected);
    },

    updateOtherTags(selected) {
      this.set("buffered.otherTags", selected);
    },
  },
};
