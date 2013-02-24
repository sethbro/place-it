To demo:

```
$ git clone git@github.com:sethbro/place-it
$ bundle
$ rake db:migrate
$ rails s
```

## Notes

When authoring pages that have several unique, complex sets of client-side behavior, I often create a page-level controller object that runs initialization tasks & coordinates between views. I started the demo app this way as well, but had a last-minute change of heart. It simply wasn't necessary for the behaviors at hand; decentralization was the better approach.

The instructions mentioned the use of Rails scaffolding. Like most devs who've been with Rails a while, I almost never use scaffolds. Unless you're dealing with a textbook RESTful resource, they're simply more trouble than they're worth, adding a bunch cruft that you have to clean up afterwards.

Since the locations in this app are fairly RESTful, & since it was mentioned, I did generate scaffolding for the Locations table. I also left the standard routes & html paths in place, though they're not meant to be accessed. However, I disabled JSON access to routes that aren't used in the app, rewrote the index view (obviously), & changed the generated tests to only deal with real world use cases.

For JS tests, I went with what I know, which is Mocha using [BDD Chai](http://chaijs.com/api/bdd/) assertions, & [Sinon](http://sinonjs.org/docs/) for stubbing/mocking. These run through a gem called Konacha. To run the suite, `rake konacha:serve` from the command line, then visit localhost:3500 in your browser. I have primarily unit tests, & don't claim 100% coverage or anything, but wanted to demonstrate general conscientiousness re: JS testing. The Ruby tests, as mentioned above, are boilerplate. `rake test` to run those.

Styles I poached from other projects. I included basic error handling but stopped short of niceties like clientside form validation, loaders, etc.

Anyhow, let me know if you have any questions, run into issues, etc.


## Requirements

An application that lets users enter a list of locations and shows them on a Google Map. The app should show the list of locations the user has already entered, letting the user update or remove them. The list should be saved to a database by the Rails server as the locations are entered. The front-end should be implemented with Backbone. We are interested in seeing how you use the following components.

* JS usage with third-party APIs
* Backbone View, Model, and Collection usage
* Ruby on Rails usage including scaffolding

