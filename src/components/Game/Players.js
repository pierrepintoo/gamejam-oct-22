import Axis from "axis-api";

const player1 = Axis.createPlayer({
    id: 1,
    joysticks: Axis.joystick1,
    // Can also be an array of both joysticks...
    // joysticks: [Axis.joystick1, Axis.joystick2],
    buttons: Axis.buttonManager.getButtonsById(1), // Give player 1 all buttons from group 1
});

const player2 = Axis.createPlayer({
    id: 2,
    joysticks: Axis.joystick2,
    buttons: Axis.buttonManager.getButtonsById(2), // Give player 1 all buttons from group 2
});

export {player1, player2}