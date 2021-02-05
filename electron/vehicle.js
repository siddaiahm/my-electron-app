function Vehicle() {
  this.data = {
    TIMER: 0.0,
    CHARGING_STATUS: 0,
    SPEED: 0,
    MOTOR_RPM: 0,
    SOC: 80,
    RANGE_REMAINING: 170,
    ODO_METER: 0,
    TRIP_METER: 4,
    LEFT_INDICATOR_STATUS: 0,
    RIGHT_INDICATOR_STATUS: 0,
    HEADLIGHT_STATUS: 0,
    LOW_HIGH_BEAM: 0,
    KILL_SWITCH_STATUS: 0,
    SIDE_STAND_STATUS: 0,
    REAL_TIME_CLOCK: 0.0,
    DASHBOARD_CONTROL_BUTTON_UP: 0,
    DASHBOARD_CONTROL_BUTTON_DOWN: 0,
    DASHBOARD_CONTROL_BUTTON_LOOP: 0,
    DASHBOARD_CONTROL_BUTTON_OK: 0,
    DASHBOARD_CONTROL_BUTTON_TRIP_RESET: 0,
    DASHBOARD_CONTROL_BUTTON_ZOOM_IN: 0,
    DASHBOARD_CONTROL_BUTTON_ZOOM_OUT: 0,
    DAY_NIGHT_MODE_SWITCH: 0,
    TIME_TO_FULL_CHARGE: 0,
    BRIGHTNESS_CONTROL: 0,
    INDICATOR_FLASHES_PER_MINUTE: 0.0,
    DISPLAY_ON_OFF: 1,
    SWITCH_SCREEN: 1,
    DIAGNOSTIC_CODE: 0,
  };
  this.interVal = null;
  this.setSoc = (newSoc) => {
    if (newSoc >= 0 && newSoc <= 100) {
      this.data["SOC"] = newSoc;
    }
  };

  this.setSpeed = (newSpeed) => {
    this.data.SPEED = newSpeed;
  };

  this.setRpm = (newRpm) => {
    this.data.MOTOR_RPM = newRpm;
  };
  this.setRangeRemaining = (newRange) => {
    this.data.RANGE_REMAINING = newRange;
  };
  this.setOdoMeter = (newOdoValue) => {
    this.data.ODO_METER = newOdoValue;
  };

  this.setTripMeter = (newTripValue) => {
    this.data.TRIP_METER = newTripValue;
  };
  this.setSpeed = (newSpeed) => {
    this.data.SPEED = newSpeed;
  };
  this.setLeftIndicaterState = (newLeftIndicaterState) => {
    this.data.LEFT_INDICATOR_STATUS = newLeftIndicaterState;
  };
  this.setRightIndecaterState = (newRightIndecaterState) => {
    this.data.RIGHT_INDICATOR_STATUS = newRightIndecaterState;
  };
  this.setButtonUpState = (newButtonUpState) => {
    this.data.DASHBOARD_CONTROL_BUTTON_UP = newButtonUpState;
  };
  this.setButtonDownState = (newButtonDownState) => {
    this.data.DASHBOARD_CONTROL_BUTTON_DOWN = newButtonDownState;
  };
  this.setButtonOk = (newButtonOk) => {
    this.data.DASHBOARD_CONTROL_BUTTON_OK = newButtonOk;
  };
  this.setDayNightState = (newDayNightState) => {
    this.data.DAY_NIGHT_MODE_SWITCH = newDayNightState;
  };
  this.setTimeToFullCharge = (newTimeToFullCharge) => {
    this.data.TIME_TO_FULL_CHARGE = newTimeToFullCharge;
  };
  this.setSwitchScreenLeft = (newSwitchScreenLeft) => {
    this.data.SWITCH_SCREEN_LEFT = newSwitchScreenLeft;
  };
  this.setSwitchScreenRight = (newSwitchScreenRight) => {
    this.data.SWITCH_SCREEN_RIGHT = newSwitchScreenRight;
  };
  this.setDisplayState = (newDisplayState) => {
    this.data.DISPLAY_ON_OFF = newDisplayState;
  };
  this.setChargeState = (newChargeState, callback) => {
    if (newChargeState) {
      this.interVal = setInterval(() => {
        this.setSoc(this.data.SOC + 1);
        callback(this.data.SOC);
      }, 3000);
    } else {
      clearInterval(this.interVal);
    }
    this.data.CHARGING_STATUS = newChargeState;
  };
  this.getData = () => {
    return this.data;
  };

  this.setSwitchScreenState = (newSwitchScreenState) => {
    this.data.SWITCH_SCREEN = newSwitchScreenState;
  };
}

module.exports = Vehicle;
