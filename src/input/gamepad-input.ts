const updateTracking: number[] = [];

export interface IGamepadSnapshot {
  gamepad: Gamepad;
  changed: boolean;
}

export function getGamepadSnapshot(index): IGamepadSnapshot {
  const gamepad: Gamepad = navigator.getGamepads()[index];
  if (!gamepad || !gamepad.connected) {
    return;
  }

  const changed: boolean = updateTracking[index] !== gamepad.timestamp;
  updateTracking[index] = gamepad.timestamp;
  return {
    gamepad,
    changed
  };
}
