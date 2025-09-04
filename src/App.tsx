import MyAwesomeApp from "./components/MyAwesomeApp";
import memeImg from "./assets/groseriasFuertes.png"; // Importa la imagen


export function App() {
    return (
        <div className="app-container">
            <h1>Hello Tics</h1>
            <p>
                Groserias fuertes para Tico
            </p>
            <img
                src={memeImg} // Usa la variable importada
                alt="Meme"
                style={{
                    display: "block",
                    margin: "24px auto",
                    maxWidth: "320px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 24px #000a"
                }}
            />
            <button>deploy biolencia</button>
            <MyAwesomeApp />
        </div>
    );
}