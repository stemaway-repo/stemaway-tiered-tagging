import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";
import DiscourseRoute from "discourse/routes/discourse";
import I18n from "I18n";

export default DiscourseRoute.extend({
  model() {
    return ajax(`/skills.json`).catch(popupAjaxError);
  },

  titleToken() {
    return I18n.t("stemaway_tiered_tagging.skills_page.title");
  },

  setupController(controller, model) {
    const { skills } = model;
    controller.set("skills", skills);
  },
});
