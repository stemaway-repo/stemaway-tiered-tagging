import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.2.0", (api) => {
  const PLUGIN_ID = "stemaway-tiered-tagging";
  const siteSettings = api.container.lookup("site-settings:main");
  const FIELDS = [
    { name: "pathway", type: "json" },
    { name: "skill", type: "json" },
    { name: "sub_skill", type: "json" },
    { name: "other_tags", type: "json" },
  ];

  api.modifyClass("controller:composer", {
    pluginId: PLUGIN_ID,
  });

  FIELDS.forEach((field) => {
    api.serializeOnCreate(field.name);
    api.serializeToDraft(field.name);
    api.serializeToTopic(field.name, `topic.${field.name}`);
  });
});
