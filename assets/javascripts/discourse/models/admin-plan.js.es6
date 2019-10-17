import { ajax } from "discourse/lib/ajax";

const AdminPlan = Discourse.Model.extend({
  name: "",
  interval: "month",
  amount: 0,
  intervals: ["day", "week", "month", "year"],

  destroy() {
    return ajax(`/patrons/admin/plans/${this.id}`, { method: "delete" });
  },

  save() {
    const data = {
      nickname: this.nickname,
      interval: this.interval,
      amount: this.amount,
      product_id: this.product_id
    };

    return ajax("/patrons/admin/plans", { method: "post", data });
  }
});

AdminPlan.reopenClass({
  findAll() {
    return ajax("/patrons/admin/plans", { method: "get" }).then(result =>
      result.map(plan => AdminPlan.create(plan))
    );
  },

  find(id) {
    return ajax(`/patrons/admin/plans/${id}`, { method: "get" }).then(plan =>
      AdminPlan.create(plan)
    );
  }
});

export default AdminPlan;
