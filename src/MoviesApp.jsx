import React, { useState } from 'react'

export const MoviesApp = () => {
    const URL_BASE = 'https://api.themoviedb.org/3/search/movie';
    const API_KEY = '5430057c576d359051af90d7060e2941';

    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.length > 0) fetchMovies();
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${URL_BASE}?api_key=${API_KEY}&query=${search}`);
            const data = await response.json();
            setMovies(data);
            console.log(data);

        } catch (error) {
            console.error('Ocurrió el siguiente problema: ', error);
        }
    }
    return (
        <div className='container'>
            <h1>MoviesApp</h1>
            <hr />
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Start typing a movie...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <button type="submit">Search</button>
            </form>

            <div className="movie-list">
                {movies?.results?.map(movie => (
                    <div className='movie-card' key={movie.id} >
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}
