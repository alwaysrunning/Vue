(function(exports){

    var filters = {

        all: function(todos){
        	return todos;
        },

        active: function(todos){
        	return todos.filter(function(todo){
        		return !todo.completed
        	})
        },

        completed: function(todos){
        	return todos.filter(function(todo){
        		return todo.completed
        	})
        }

    }

    exports.app = new Vue({

    	el: '.todoapp',

    	data: {
    		newTodo : '',
    		todos: todoStorage.fetch(),
    		editedTodo: null,
    		visibility: 'all'
    	},

    	watch: {
    		todos: {
    			handler: function(todos){
    				todoStorage.save(this.todos);
    			}
    		}
    	},

    	computed: {
    		filteredTodos: function(){
    			return filters.all(this.todos)
    		},
    		remaining: function(){
    			return filters.active(this.todos).length
    		},
    		allDone:{
    			set: function(value){
    				this.todos.forEach(function(todo){
    					todo.completed = value;
    				})
    			},
    			get: function(){
    				return this.remaining == 0 
    			}
    		}
    	},

    	methods: {
    		addTodo: function(){
    			var value = this.newTodo && this.newTodo.trim();
    			if(!value){
    				return
    			}
                this.todos.push({title:value,completed:false})
                this.newTodo = '';
    		},
    		editTodo: function(todo){
    			this.editedTodo = todo;
    			this.beforeEditCache = todo.title;
    		},
    		removeTodo: function(todo){
    			this.todos.$remove(todo);
    		},
    		doneEdit: function(todo){
    			todo.title = todo.title.trim();
    			this.editedTodo = null;
    		},
    		cancelEdit: function(todo){
    			todo.title = this.beforeEditCache;
    			this.editedTodo = null;
    		},
    		removeCompleted: function(){
    			var self = this
    			filters.completed(this.todos).forEach(function(todo){
                    self.todos.$remove(todo)
    			})

    		}
    	},

    	directives: {
    		'todo-focus' : function(value){
    			if(!value){
    				return
    			}
    			var el = this.el;
    			Vue.nextTick(function(){
    				el.focus()
    			})
    		}
    	}
    })

})(window)