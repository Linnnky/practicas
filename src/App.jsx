import { useEffect, useState } from "react"
import './App.css'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [factError, setFactError] = useState()
    //para recuperar la cita al cargar la página
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => {
                if (!res.ok) throw new Error ('Error charging a new fact');
                return res.json();
    })
            .then(data => {
                const { fact } = data
                setFact(fact)
            })    
            .catch(err => {
                console.error('Error fetching cat fact', err);
                // podriamos setFact(null) o mostrar mensaje de error
            });
    }, [])

    // para recuperar la imagen cada vez que tenemos una cita nueva
    useEffect(() => {
        if (!fact) return

         const firstWord = fact.split(' ') [0]

                fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
                    .then(res => res.json())
                    .then(response => {
                        const { url } = response
                        setImageUrl(url)
                    })
    }, [fact])

    const handleClick = () => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => {
                if (!res.ok) throw new Error ('Error charging a new fact');
                return res.json();
    })
            .then(data => {
                const { fact } = data
                setFact(fact)
            })    
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>Get a new fact</button>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={imageUrl} alt={`Image using the first word for ${fact}`} />}
        
            
        </main>
     
    )
}