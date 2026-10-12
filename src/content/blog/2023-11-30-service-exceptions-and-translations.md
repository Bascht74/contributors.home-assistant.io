---
title: Exception handling during service calls and translation support
description: Service calls which raise exceptions have until now logged stack traces. Service calls that fail due to incorrect usage, for example invalid input, don't need a stack trace and would benefit from a helpful error message in the user's own language.
date: 2023-11-30
authors:
  - Jan Bouwhuis
areas:
  - core
---

## Exception handling during service calls

Service calls which raise exceptions have until now logged stack traces. Service calls that fail due to incorrect usage, for example invalid input, don't need a stack trace and would benefit from a helpful error message in the user's own language.

To be able to suppress the stack trace in these cases, the new exception type `ServiceValidationError`, which is derived from `HomeAssistantError`, has been introduced. `ServiceValidationError` should now be raised instead of `ValueError` when the service fails because it's used incorrectly. 

If the service is used correctly but still fails, `HomeAssistantError`, or a subclass of `HomeAssistantError` other than `ServiceValidationError`, should still be raised.

When a service raises `ServiceValidationError`, the error message will show in the UI, and in the logs, but the stack trace is logged at debug level. For other exceptions that are raised from a service call (including  `HomeAssistantError`) nothing changes and a full stack trace is still printed at exception severity.

Integrations should be updated and raise `ServiceValidationError` instead of `ValueError` when the the service fails due to incorrect usage, and `HomeAssistantError` when it fails for other expected errors, for example a network error. [Read more](/core/integrations/setup-failures/).

## Translation support for Exceptions

The `HomeAssistantError` exception and its subclasses, including `ServiceValidationError`, now accept a translation key to allow localization. [Read more](/core/integrations/translations/#exceptions). The translation key will be used in cases where the frontend receives information about the exception. The English error message from the translation cache will also be used to log a message to the console if no custom error message is passed to the exception as argument.

### Background

- Background [discussion](https://github.com/home-assistant/architecture/discussions/992).
- Implementation [Core PR #102592](https://github.com/home-assistant/core/pull/102592).
