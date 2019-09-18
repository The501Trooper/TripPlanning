# Sprint 2 - t11 - Team America

## Goal

### A map and itinerary!
### Sprint Leader: *Sean Boyd*

## Definition of Done

* Version in pom.xml should be `<version>2.0.0</version>` for your final build for deployment.
* Increment release `v2.0` created on GitHub with appropriate version number and name.
* Increment deployed for testing and demonstration on SPRINT2 assignment.
* Sprint Review and Restrospectives completed (team/sprint2.md).


## Policies

#### Mobile First Design!
* Design for mobile, tablet, laptop, desktop (in that order).
* Use ReactStrap for a consistent interface (no HTML, CSS, style, etc.).
* Must adhere to the TripCo Interchange Protocol (TIP) for interoperability and testing.
#### Clean Code
* Code Climate maintainability of A or B.
* Code adheres to Google style guides for Java and JavaScript.
#### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits include a task/issue number.
* All commits include tests for the added or modified code.
* All tests pass.
#### Continuous Integration / Delivery 
* Master is never broken.  If broken, it is fixed immediately.
* Continuous integration successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

This sprint will complete the following Epics.

* #1 Where am I: show the user their exact location on the map if available.
* #2 Vincenty: Write the code implementation of the Vincenty formula for finding the distance between two locations on a sphere.
* #3 Display Map and itinerary: implement the ability to load a trip itinerary obtained from another tool, in the standard format of TIP JSON, and show this trip on the map with an update itinerary. 
* #4 Geographic coordinate validation: validate the geographic coordinates, and if they are in an invalid format, report this to the user in a user-friendly way.
* #5 Short trip: rearranges a given trip to minimize distance and travel time.
* #6 Geographic coordinate formats: the calculator will support many different coordinate formats, so that the coordinates can be copied from different sources.

Key planning decisions for this sprint include ...
1. Putting 2 people on each epic.
2. Rotating which 2 people are working together.
3. Making a time frame for each epic at around 5 days for the pair working on it.
4. Pushing to master at least after each epic, incrementally confirming that epics/tasks are working as expected.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *value* | *value* |
| Tasks |  *value*   | *value* | 
| Story Points |  *value*  | *value* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* | *none* | 


## Review (focus on solution and technology)

In this sprint, ...

#### Completed epics in Sprint Backlog 

These Epics were completed.

* *## epic title: comments*
* 

#### Incomplete epics in Sprint Backlog 

These Epics were not completed.

* *## epic title: explanation*
*

#### What went well

The ...


#### Problems encountered and resolutions

The ...


## Retrospective (focus on people, process, tools)

In this sprint, ...

#### What we changed this sprint

Our changes for this sprint included ...

#### What we did well

We ...

#### What we need to work on

We could improve ...

#### What we will change next sprint 

We will change ...