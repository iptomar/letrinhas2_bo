var Issue = Backbone.Model.extend({});

window.IssueView = Backbone.View.extend({
  tagName: "tr",
      template: _.template('<td class="likehref"><span class="btn"><%= status %></span></td><td class="likehref"><%= lastupdate %></td><td class="likehref"><%= title %></td><td style="word-wrap: break-word; display: none"><%= description %></td>'),
     
      render: function (eventName) {

    $(this.el).html(this.template(this.model.toJSON()));

    if (this.model.get("status") == "In Progress") {
      $(".btn", this.el).addClass("btn-success btn-xs");
    } else if (this.model.get("status") == "Reported") {
      $(".btn", this.el).addClass("btn-info btn-xs");
    } else if (this.model.get("status") == "Outage") {
      $(".btn", this.el).addClass("btn-important btn-xs");
    } else if (this.model.get("status") == "Investigating") {
      $(".btn", this.el).addClass("btn-warning btn-xs");
    } else if (this.model.get("status") == "Resolved") {
      $(".btn", this.el).addClass("btn-invert btn-xs");
    }

    return this;
      }
});

window.IssuesView = Backbone.View.extend({
  initialize: function () {
  },
  events: {
    'click td': 'clickEvt'
  },
  clickEvt: function (ev) {
    var p = $('#issue_title');
    var offset = p.offset();
    console.log(offset.top)
    $('html, body').animate({
      scrollTop: 150
    });
    $('#issue_title').html('<h1>' + $($($(ev.currentTarget).parents('tr')[0]).children('td')[2]).html() + '</h1>');
    $('#issue_details').html($($($(ev.currentTarget).parents('tr')[0]).children('td')[3]).html());
    $('#issue_date').html('<h4>' + $($($(ev.currentTarget).parents('tr')[0]).children('td')[1]).html() + '</h4>');

    this.model.models[0].get('timeline').getBand(0).setCenterVisibleDate(Timeline.DateTime.parseGregorianDateTime(new Date($($($(ev.currentTarget).parents('tr')[0]).children('td')[1]).html())));
    var p = $('#issue_title');
    var offset = p.offset();
    $('html, body').animate({
      scrollTop: offset.top
    });
  },
  template: _.template('<table id="issues_table" class="table table-striped"><thead><tr><th><span class="icon-graph icon16b"></span><span> Status</span></th><th><span class="icon-calendar icon16b"></span><span> Date</span></th><th><span class="icon-info icon16b"></span><span> Conteúdo/Informação</span></th><th style="display:none"> Descrição</th></tr></thead><tbody></tbody></table>'),
  render: function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));

    _.each(this.model.models, function (issue) {
      $(this.el).find(".table tbody").append(new IssueView({
        model: issue
      }).render().el);
    }, this);
    return this;
  }

});


var Issues = Backbone.Collection.extend({
  model: Issue,
  url: "https://api.ptisp.pt/support/issues",
  parse: function (data) {
    return data.issues;
  }
});
