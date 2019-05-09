# Anno1800Helper
Yet another Anno1800Helper to help manage your Islands in Anno 1800

Demo available at: http://anno.mguv.co.uk



## Installation

### Prerequisites
- node
- yarn

### Steps
- clone or download the source code
- run `yarn install` from the root of the project
- run `yarn start` and wait for me to add more

## Usage
- Start by clicking the + to create an island
- Once created, you can swap between items using the large drop down
- When on an island, the Residence Icons can be clicked to open a panel to configure:
- - How many residents of that type your game reports you as having
- - The needs you are satisfying to this house (for ease it assumes 100% coverage when enabled)
- The demand page will then show a break down of:
- - How many Residnce buildings you need to support that population with the given needs fufilled
- - The consumption rate of any enabled demands that use resources

## Direction
- Full set of Residences/Needs
- - App currently only works for Farmers/Workers, need to support all tiers
- Consumption
- - Convert Consumption units to be more friendly (I.e. per 10 minutes instead of per second)
- - Add ability to configure the industries present on an island, including the work rate of the employees
- - "consumption vs production" comparison, to see if the island can sell extra or needs to import more
- Empire Summary
- - Combined stats from accross all islands, allows a higher view of consumption rates and what materials can be imported/exported
- Responsiveness
- - App has been laid out with responisvenss in mind but will require some work to include media queries, find sensible limits and convert some areas to use grid to give proper control over how columns collapse in to rows.


# Motivation
The main goal of this project was to help assist with the game Anno 1800, as the game has some balancing involved about resource generation and consumption, with the numbers being hidden and difficult to align.

Whilst this project could (and originally) was completed with just a spreadsheet, I soon wanted to be able to add more features that were slightly more complicated and realised it would make a decent little web app that others could use.

Combined with the fact I could this project to try out some ideas in React/TypeScript, I figured why not make it? It also got me to get my website back online and start using docker as a web host to easily encapsulate and host my app.

# Findings
- The EventValue is a very interesting concept but easy to overuse
- - There are times I've bound to it in many sibling components to get them to redraw. It should have been a Prop and the parent of them all should have been watching for simplicity and less events.
- - In general though, it works very well compared to relying on something like Redux which has a ton of learning overhead and confusion with state management
