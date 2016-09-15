var app = app || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
app.TodoView = Backbone.View.extend({

  //... is a list tag.
  tagName: 'li',

  // Cache the template function for a single item.
  template: _.template( $('#item-template').html() ),

  // The DOM events specific to an item.
  events: {
    'dblclick label': 'edit',
    'click .destroy': 'clear',
    'click .toggle': 'toggleCompleted',
    'click .add-description': 'addDescription',
    'click .remove-description': 'removeDescription',
    'change #priority': 'changePriority',
    'keypress .edit': 'updateOnEnter',
    'keypress textarea': 'updateOnEnter',
    'blur .edit': 'close'
  },

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondence between a **Todo** and a **TodoView** in this
  // app, we set a direct reference on the model for convenience.
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },

  // Re-renders the titles of the todo item.
  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    this.$input = this.$('.edit');
    this.$textarea = this.$('textarea');
    this.$el.toggleClass( 'completed', this.model.get('completed') );
    this.toggleVisible(); 

    if(this.$textarea.val().trim()) { this.$textarea.removeClass('hidden'); }

    return this;
  },

  toggleVisible : function () {
    this.$el.toggleClass( 'hidden',  this.isHidden());
  },

  // Determines if item should be hidden
  isHidden : function () {
    var isCompleted = this.model.get('completed');
    return ( // hidden cases only
      (!isCompleted && app.TodoFilter === 'completed')
      || (isCompleted && app.TodoFilter === 'active')
    );
  },

  // Toggle the `"completed"` state of the model.
  toggleCompleted: function() {
    this.model.toggle();
  },

  // Switch this view into `"editing"` mode, displaying the input field.
  edit: function() {
    this.$el.addClass('editing');
    this.$input.focus();
  },

  // Close the `"editing"` mode, saving changes to the todo.
  close: function() {
    var value = this.$input.val().trim(),
        description = this.$textarea.val().trim();

    if ( value ) {
      this.model.save({ 
        title: value,
        description: description
      });
    } else {
      this.clear();
    }

    this.$el.removeClass('editing');
  },

  // Remove the item, destroy the model from *localStorage* and delete its view.
  clear: function() {
    this.model.destroy();
  },
  
  // If you hit `enter`, we're through editing the item, `shift` + `enter` = \n
  updateOnEnter: function( e ) {
    if ( e.which === ENTER_KEY && !e.shiftKey) {
      this.close();
    } else if( e.which === ENTER_KEY && e.shiftKey ) {
      this.value = "\n";
    }
  },

  removeDescription: function() {
    this.model.save({
      description: ''
    });

    this.$textarea.addClass('hidden');
    this.$('.add-description').removeClass('hidden');
    this.$('.remove-description').addClass('hidden');
  },

  addDescription: function() {
    this.$textarea.removeClass('hidden');
    this.$('.add-description').addClass('hidden');
    this.$('.remove-description').removeClass('hidden');
  },

  changePriority: function( e ) {
    var priority = this.$(e.currentTarget).val();
    
    this.model.save({
      priority: priority
    });
  }
});