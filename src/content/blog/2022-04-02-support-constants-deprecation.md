---
title: Deprecating all SUPPORT_* constants
description: As of Home Assistant Core 2022.5, all SUPPORT_* constants are deprecated, each entity platform is providing an EntityFeature enum to replace them.
date: 2022-04-02
authors:
  - Franck Nijhof
areas:
  - core
---

As of Home Assistant Core 2022.5, all `SUPPORT_*` constants are deprecated,
each entity platform is providing an `EntityFeature` enum to replace them.

This applies to, the following platforms:

- **Alarm Control Panel**

  Deprecated supported feature constants:

  - `SUPPORT_ALARM_ARM_AWAY`
  - `SUPPORT_ALARM_ARM_CUSTOM_BYPASS`
  - `SUPPORT_ALARM_ARM_HOME`
  - `SUPPORT_ALARM_ARM_NIGHT`
  - `SUPPORT_ALARM_ARM_VACATION`
  - `SUPPORT_ALARM_TRIGGER`

  Use the new [`AlarmControlPanelEntityFeature`](/core/entities/alarm-control-panel/#supported-features) enum instead.

- **Camera**

  Deprecated supported feature constants:

  - `SUPPORT_ON_OFF`
  - `SUPPORT_STREAM`

  Use the new [`CameraEntityFeature`](/core/entities/camera/#supported-features) enum instead.

- **Cover**

  Deprecated supported feature constants:

  - `SUPPORT_OPEN`
  - `SUPPORT_CLOSE`
  - `SUPPORT_SET_POSITION`
  - `SUPPORT_STOP`
  - `SUPPORT_OPEN_TILT`
  - `SUPPORT_CLOSE_TILT`
  - `SUPPORT_STOP_TILT`
  - `SUPPORT_SET_TILT_POSITION`

  Use the new [`CoverEntityFeature`](/core/entities/cover/#supported-features) enum instead.

- **Climate**

  Deprecated supported feature constants:

  - `SUPPORT_TARGET_TEMPERATURE`
  - `SUPPORT_TARGET_TEMPERATURE_RANGE`
  - `SUPPORT_TARGET_HUMIDITY`
  - `SUPPORT_FAN_MODE`
  - `SUPPORT_PRESET_MODE`
  - `SUPPORT_SWING_MODE`
  - `SUPPORT_AUX_HEAT`

  Use the new [`ClimateEntityFeature`](/core/entities/climate/#supported-features) enum instead.

- **Humidifier**

  Deprecated supported feature constants:

  - `SUPPORT_MODES`

  Use the new [`HumidifierEntityFeature`](/core/entities/humidifier/#supported-features) enum instead.

- **Fan**

  Deprecated supported feature constants:

  - `SUPPORT_SET_SPEED`
  - `SUPPORT_OSCILLATE`
  - `SUPPORT_DIRECTION`
  - `SUPPORT_PRESET_MODE`

  Use the new [`FanEntityFeature`](/core/entities/fan/#supported-features) enum instead.

- **Light**

  Deprecated supported feature constants:

  - `SUPPORT_EFFECT`
  - `SUPPORT_FLASH`
  - `SUPPORT_TRANSITION`

  Use the new [`LightEntityFeature`](/core/entities/light/#supported-features) enum instead.

  Note that the following light constants were already deprecated,
  thus `LightEntityFeature` does not provide a replacement for those.

  - `SUPPORT_BRIGHTNESS`
  - `SUPPORT_COLOR_TEMP`
  - `SUPPORT_COLOR`
  - `SUPPORT_WHITE_VALUE`

  These cases should instead be migrated to the [new color modes](/core/entities/light/#color-modes).

- **Lock**

  Deprecated supported feature constants:

  - `SUPPORT_OPEN`

  Use the new [`LockEntityFeature`](/core/entities/lock/#supported-features) enum instead.

- **Media Player**

  Deprecated supported feature constants:

  - `SUPPORT_PAUSE`
  - `SUPPORT_SEEK`
  - `SUPPORT_VOLUME_SET`
  - `SUPPORT_VOLUME_MUTE`
  - `SUPPORT_PREVIOUS_TRACK`
  - `SUPPORT_NEXT_TRACK`
  - `SUPPORT_TURN_ON`
  - `SUPPORT_TURN_OFF`
  - `SUPPORT_PLAY_MEDIA`
  - `SUPPORT_VOLUME_STEP`
  - `SUPPORT_SELECT_SOURCE`
  - `SUPPORT_STOP`
  - `SUPPORT_CLEAR_PLAYLIST`
  - `SUPPORT_PLAY`
  - `SUPPORT_SHUFFLE_SET`
  - `SUPPORT_SELECT_SOUND_MODE`
  - `SUPPORT_BROWSE_MEDIA`
  - `SUPPORT_REPEAT_SET`
  - `SUPPORT_GROUPING`

  Use the new [`MediaPlayerEntityFeature`](/core/entities/media-player/#supported-features) enum instead.

- **Remote**

  Deprecated supported feature constants:

  - `SUPPORT_LEARN_COMMAND`
  - `SUPPORT_DELETE_COMMAND`
  - `SUPPORT_ACTIVITY`

  Use the new [`RemoteEntityFeature`](/core/entities/remote/#supported-features) enum instead.

- **Siren**

  Deprecated supported feature constants:

  - `SUPPORT_DURATION`
  - `SUPPORT_TONES`
  - `SUPPORT_TURN_OFF`
  - `SUPPORT_TURN_ON`
  - `SUPPORT_VOLUME_SET`

  Use the new [`SirenEntityFeature`](/core/entities/siren/#supported-features) enum instead.

- **Vacuum**

  Deprecated supported feature constants:

  - `SUPPORT_TURN_ON`
  - `SUPPORT_TURN_OFF`
  - `SUPPORT_PAUSE`
  - `SUPPORT_STOP`
  - `SUPPORT_RETURN_HOME`
  - `SUPPORT_FAN_SPEED`
  - `SUPPORT_BATTERY`
  - `SUPPORT_STATUS`
  - `SUPPORT_SEND_COMMAND`
  - `SUPPORT_LOCATE`
  - `SUPPORT_CLEAN_SPOT`
  - `SUPPORT_MAP`
  - `SUPPORT_STATE`
  - `SUPPORT_START`

  Use the new [`VacuumEntityFeature`](/core/entities/vacuum/#supported-features) enum instead.

- **Water Heater**

  Deprecated supported feature constants:

  - `SUPPORT_TARGET_TEMPERATURE`
  - `SUPPORT_OPERATION_MODE`
  - `SUPPORT_AWAY_MODE`

  Use the new [`WaterHeaterEntityFeature`](/core/entities/water-heater/#supported-features) enum instead.

