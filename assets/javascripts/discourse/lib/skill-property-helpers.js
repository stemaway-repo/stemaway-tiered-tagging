import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

export function buildDropdown(all, selected) {
  return all
    .filter((value) => selected.includes(value.name))
    .map((value) => value.skills)
    .flat(1);
}

export function updateDependantDropdowns(context, buffered, all, action) {
  if (!buffered) {
    return;
  }

  const updated = all
    .filter((v) => buffered.includes(v.name))
    .map((v) => v.name);

  return context.send(action, updated);
}

export function resetProperties(model, component) {
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

export function setPathwayProps(context, all, selected) {
  const skills = buildDropdown(all, selected);
  return context.setProperties({
    showSkills: true,
    skills,
  });
}

export function setSkillProps(context, all, selected) {
  const subSkills = buildDropdown(all, selected);
  return context.setProperties({
    showSubSkills: true,
    subSkills,
  });
}

export function handlePrefillData(allData, context) {
  // Prefill data when opening a draft/editing a topic
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

  // Prefill otherTags input when editing old topics that don't only have regular tags
  if (
    model.pathway === null &&
    model.skill === null &&
    model.subSkill === null &&
    model.tags
  ) {
    model.set("otherTags", model.tags);
  }
}

export function prepareData(context) {
  return ajax(`/skills.json`)
    .then((result) => {
      const allData = result.skills;
      context.set("pathways", allData);
      handlePrefillData(allData, context);
    })
    .catch(popupAjaxError);
}
