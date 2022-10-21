import './notice.css'

const Notice = () => {
    return (
        <div className="notice">
            <h1>Notice du jeu</h1>
            <div className="content-notice">
                <div>
                    <img src="assets\notice\joystick.png" alt="" />
                    <p>Rotation des plateformes</p>
                </div>
                <div>
                    <img src="assets\notice\touche_s.png" alt="" />
                    <p>Sélection</p>
                </div>
                <div>
                    <img src="assets\notice\touche_a.png" alt="" />
                    <p>Saut ou double saut</p>
                </div>
            </div>
        </div>
    )
}

export default Notice;