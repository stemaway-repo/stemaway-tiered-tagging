import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

function buildDropdown(all, selected) {
  return all
    .filter((value) => selected.includes(value.name))
    .map((value) => value.skills)
    .flat(1);
}

function resetProperties(model, component) {
  model.setProperties({
    pathway: null,
    skill: null,
    subSkill: null,
  });

  return component.setProperties({
    showSkills: false,
    showSubSkills: false,
  });
}

function setPathwayProps(context, all, selected) {
  const skills = buildDropdown(all, selected);
  return context.setProperties({
    showSkills: true,
    skills,
  });
}

function setSkillProps(context, all, selected) {
  const subSkills = buildDropdown(all, selected);
  return context.setProperties({
    showSubSkills: true,
    subSkills,
  });
}

function handleOpenDraft(allData, context) {
  // Prefill data when opening a draft
  const model = context.model;

  if (model.pathway) {
    context.set("pathway", model.pathway);
  }

  if (model.skill) {
    setPathwayProps(context, allData, model.pathway);
  }

  if (model.subSkill) {
    const allSkills = buildDropdown(allData, model.pathway);
    setSkillProps(context, allSkills, model.skill);
  }
}

export default {
  shouldRender(args, component) {
    return component.siteSettings.stemaway_tiered_tagging_enabled;
  },

  setupComponent(attrs, component) {
    const model = attrs.model;

    ajax(`/skills.json`)
      .then((result) => {
        const allData = result.skills;
        this.set("pathways", allData);
        handleOpenDraft(allData, this);
      })
      .catch(popupAjaxError);
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
