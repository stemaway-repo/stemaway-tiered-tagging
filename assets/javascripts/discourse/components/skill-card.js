import Component from "@ember/component";
import { action } from "@ember/object";

export default Component.extend({
  tagName: "div",
  classNames: ["skills-card-pathway"],

  @action
  showSkills() {
    this.set("childSkills", !this.childSkills);
  },
});
