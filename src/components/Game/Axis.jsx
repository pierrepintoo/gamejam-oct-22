import React from "react";
import Axis from "axis-api";

const AxisFunction = () => {
    Axis.registerKeys("q", "a", 1);
    // Axis.registerKeys("s", "x", 1);
    Axis.addEventListener("keydown", keydownHandler);
    
    const gamepadEmulator = Axis.createGamepadEmulator(0);
    Axis.joystick1.setGamepadEmulatorJoystick
    (gamepadEmulator, 0);
    Axis.addEventListener("joystick:move", joystickMoveHandler);
    
    Axis.registerGamepadEmulatorKeys(gamepadEmulator, 0, "x", 1);
    Axis.registerGamepadEmulatorKeys(gamepadEmulator, 1, "w", 1);
    Axis.registerGamepadEmulatorKeys(gamepadEmulator, 2, "s", 1);
    Axis.registerGamepadEmulatorKeys(gamepadEmulator, 3, "i", 1);
    Axis.addEventListener("keydown", keydownHandler);

    function joystickMoveHandler(e) {
        // Get the joystick id in the event payload object
        if (e.id === 1) {
            console.log(e.position.x, e.position.y )
            // if (e.position.x === 1) console.log('1')
        } 
    }
        
    function keydownHandler(e) {
        // Get the current button key pressed in the event payload object
        if (e.key === "a") {
            console.log('a')
        }
        if (e.key === "x") {
            console.log('boubon X manette')
        }
        if (e.key === "i") {
            console.log('boubon triangle manette')
        }
        if (e.key === "w") {
            console.log('boubon cercle manette')
        }
        if (e.key === "s") {
            console.log('boubon carré manette')
        }
    }

    function update() {
        gamepadEmulator.update();
        requestAnimationFrame(update);
    }
    update();
}

export default AxisFunction;