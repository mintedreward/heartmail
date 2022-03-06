Contributing
============

- Keep using js-standard or ts-standard as the linter across all javascript / typescript code.
- Enforce 95%+ test coverage. We need to add an automatic code coverage tool to
  get this going.
- Consider using prettier if it can be used without being too annoying.
- Start putting all tests pertaining to protocol specifications into standard
  JSON files that can be used across programming language and not just
  javascript. There can be language-specific tests, but there should also be
  standard test vectors for every language. The directory sbw-tests is intended
  to contain standard test vectors.
- Manually enforce variable naming conventions for consistency. Do variable
  names, camel case, etc., look like the rest of the code?
- We can add a CONTRIBUTING.md file to outline all code conventions. We can
  start with javascript and add other languages when necessary.
- Review process for pull requests: For now, all spec changes and code changes
  are reviewed by @ryanxcharles. We will need to add more spec and code
  reviewers over time. We will pick people who contribute to be reviewers.
- Where we must include dependencies, always specify exact versions in
  package.json.
- Consider tools such as <https://socket.dev/>
- Review Github marketplace for candidate security integrations, code review, and code quality

## Best Practices for Variable / Function / Method Names

Be considerate of others when naming variables. Code readability is crucial to maintainability. 

### Use Descriptive Names

When logic is not immediately clear, assign it to a descriptive variable name.

**Bad**

```JavaScript
if(users.some(user => user.isActive))
```

**Better**

```JavaScript
const isAnyUserActive = users.some(user => user.isActive)
if(isAnyUserActive)
```

### Avoid Negatives

Variables with negatives in their names are confusing.

**Bad**

```JavaScript
const hasNoValues = myArray.length == 0
```

**Better** 

```JavaScript
const hasValues = myArray.length > 0
```

### Prefix Boolean Logic With Auxiliary Verbs

Such as *must*, *should*, *can*, *is*, *has*, etc.

### Favor Descriptive Names Instead of Comments

Comments in code are rarely necessary if names are descriptive. Aim to explain yourself with code rather than comments.

To learn more, watch [this presentation](https://www.youtube.com/watch?v=2a_ytyt9sf8) by Robert Martin AKA Uncle Bob.
