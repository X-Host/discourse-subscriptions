import { ajax } from "discourse/lib/ajax";

const Group = Discourse.Model.extend({});

Group.reopenClass({
  subscriptionGroup:
    Discourse.SiteSettings.discourse_patrons_subscription_group,

  find() {
    return ajax(`/groups/${this.subscriptionGroup}`, { method: "get" }).then(
      result => {
        return Group.create(result.group);
      }
    );
  }
});

export default Group;
