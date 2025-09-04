import { useEffect, useState } from "react";
import MyAwesomeApp from "./components/MyAwesomeApp";

// Palabras clave para filtrar memes de "miércoles de biolencia"
const MEME_KEYWORDS = [
    "rage",
    "angry",
    "violence",
    "fight",
    "explosion",
    "scream",
    "mad",
    "evil",
    "destroy",
    "chaos",
    "brutal",
    "aggressive",
    "punch",
    "attack",
    "blood",
    "furious",
    "wild",
    "crazy",
    "insane",
    "danger"
];

const MEME_SUBREDDITS = [
    "catmemes",
    "me_irl",
    "wholesomememes",
    "IllegallySmolCats",
    "Thisismylifemeow"
];

/**
 * Muestra un meme al azar que contiene alguna de las palabras clave en MEME_KEYWORDS.
 * Al hacer clic en el bot n "Cambiar meme" se muestra otro meme diferente.
 * Si hay un error al cargar los memes, se muestra un mensaje de error.
 *
 * Utiliza el hook useState para guardar los memes en un estado y
 * el hook useEffect para cargar los memes en el estado al montar el componente.
 *
 * @returns Un JSX element que muestra un meme o un mensaje de error.
 */
export function App() {
    const [memes, setMemes] = useState<string[]>([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [randomSubreddit] = useState(MEME_SUBREDDITS[Math.floor(Math.random() * MEME_SUBREDDITS.length)]);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        fetch(`https://meme-api.com/gimme/${randomSubreddit}/10`)
            .then(res => res.json())
            .then(data => {
                const memeUrls = data.memes.map((m: any) => m.url);
                setMemes(memeUrls);
                setLoading(false);
            })
            .catch(err => {
                setError("Error al cargar memes: " + err.message);
                setLoading(false);
            });
    }, []);

    const handleNextMeme = () => {
        setIndex((prev) => (prev + 1) % memes.length);
    };

    return (
        <div className="app-container">
            <h1>Memes diarios</h1>
            <p>
                Hola Mich, bienvenido a tu dosis diaria de memes. Haz clic en el meme para verlo en grande.
            </p>
            <h3>{randomSubreddit}</h3>
            {loading && <p>Cargando memes...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && memes.length > 0 && (
                <>
                    <img
                        src={memes[index]}
                        alt="Meme"
                        style={{
                            display: "block",
                            margin: "24px auto",
                            width: "540px",
                            height: "540px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            boxShadow: "0 4px 24px #000a",
                            cursor: "pointer"
                        }}
                        onClick={() => setShowOverlay(true)}
                    />
                    {/* Contador de memes */}
                    <div style={{ textAlign: "center", margin: "12px 0", color: "#1976d2", fontWeight: 600 }}>
                        Meme {index + 1} de {memes.length}
                    </div>
                    {showOverlay && (
                        <div
                            className="meme-overlay"
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 1000
                            }}
                            onClick={() => setShowOverlay(false)}
                        >
                            <img
                                src={memes[index]}
                                alt="Meme grande"
                                style={{
                                    maxWidth: "90vw",
                                    maxHeight: "90vh",
                                    borderRadius: "16px",
                                    boxShadow: "0 8px 32px #000"
                                }}
                                onClick={e => e.stopPropagation()}
                            />
                        </div>
                    )}
                </>
            )}
            <button onClick={handleNextMeme} disabled={loading || memes.length === 0}>
                Cambiar meme
            </button>
        </div>
    );
}