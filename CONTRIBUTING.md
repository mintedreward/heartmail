Contributing
============

- Keep using js-standard as the linter across all javascript code.
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
- Consider tools such as https://socket.dev/
- Review Github marketplace for candidate security integrations, code review, and code quality
