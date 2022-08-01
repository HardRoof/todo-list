# Code Review

Hey Mateus,

I have gathered some early thoughts in this review file to give you an idea of where we could go from here in future face-to-face sessions.

Please know that these comments are all suggestions meant to help you advance your programming skills. As such they are meant to encourage you, not discourage. Keep in mind that there is no right/wrong way to go about things here, only trade-offs. If you find parts of my comments useful, please let me know and we will dig deeper. If you disagree, that's fine, too, let's discuss then (Discord).

Always write done all questions you have or things that seem unclear and forward them to me or Lua, please. This kind of feedback helps me understand where you are in your journey and how to find a common ground to advance.


## First Impressions

This looks very beautiful, good work there! I can see that you have put a lot of effort into the design and CSS.

Some of the main features are already implemented, so I'll jump right into the code.


## Modularization

I see that you are trying to modularize your codebase. That in itself is a very good idea to keep the code in an orderly state, which increases maintainability. 

However, I can also see that you are trying to strike the right trade-offs here. Looks like you are struggling with finding appropriate names for the modules (file names). That is entirely to be expected and no cause to be worried.

It is a tough thing to group and names things properly, and even after years you won't get this right 100% of times.

My advice here is simple: Don't spread out classes in files too early. Instead, start with a single file and keep related classes close together. That way they kind of form logical, coherent groups. After some time spent on arranging those classes, those groups will start making sense to you and you will find it easier finding a name for them. At this point, use comments to title your groups -- like this:

```js
// CORE BUSINESS LOGIC
class TodoItem { /* ... */ }
class TodoList { /* ... */ }

// VIEWS
class TodoItemView { /* ... */ }
class TodoListView { /* ... */ }

// ...
```

Based on the grouping right there you can begin extracting pieces into their own modules (files). The titles will help you find proper names.

Always try to think of your codebase as a system. Larger parts are composed of smaller parts. The key here is to keep similar parts closer together than dissimilar parts (**principle of coherence**).

> Next steps: I suggest we try to rearrange your modules and files so that we get nice, small, coherent units.


## Separation of Concerns

Those coherent groups form layers. Just like classes, those layers follow the principle of **separation of concerns**, i.e. they have certain responsibilities, which sets them apart from other layers and classes. Some concerns I see here are:

+ UI
+ Data / "Business rules" (your To Do List domain model, independent of any UI or visualization)
+ connecting UI and business rules

This might look overkill for a seemingly simple ToDo app, but trust me: It is the kind of practice you need to work on larger codebases.


> Next steps: I recommended figuring out which layers you have in your codebase and then separating them, so that the overall maintainability is increased and you find it easier working with your code.


## Next Steps: MVC

A proven way of connecting the UI with your core business logic while still keeping them separately is through the **MVC Pattern** (see [this great intro](https://www.taniarascia.com/javascript-mvc-todo-app/)). 

> Next steps: Please have a look at [Lua's repo here](https://github.com/luaroxy/odin-todolist) to see how we separated her codebase into layers and then connected them. This will be the approach we can take with your code, too.