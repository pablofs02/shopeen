import { useEffect } from 'react';
import { useFilterContext } from '../context/FilterContext';
import '../styles/AboutStyle.css'

function About(){
    
    const {handleClearCategory, handleClearRange} = useFilterContext();
    
    useEffect(() => {
        handleClearRange();
        handleClearCategory();
    }, []);
    
    return(
        <section tabIndex={0} className="cuerpo about">
            <h1>About us:</h1>
            <section>
                <div className="story-store">
                    <h2>Story of the store</h2>
                </div>
                <h5 className="">This app has been created as a project for the class "Interfaces de Usuario" at Universidad de Málaga.</h5>
            </section>
            <section className="team-section mt-4">
                <div className="team">
                <h2>Team</h2>
                <h5>The team is composed by:</h5>
                </div>
                    <ul>
                        <li><h5>Pablo Fernández Serrano</h5></li>
                        <li><h5>Guillermo Tell González</h5></li>
                        <li><h5>Javier Lanceta Salas (Team Leader)</h5></li>
                        <li><h5>Javier Leiva Dueñas</h5></li>
                    </ul>
            </section>
            <footer className='tech-used'>
                <h2>In this project we used: </h2>
                <ul>
                    <li><h5>React</h5></li>
                    <li><h5>React Router</h5></li>
                    <li><h5>React Bootstrap</h5></li>
                    <li><h5>React Icons</h5></li>
                    <li><h5>CSS</h5></li>
                    <li><h5>Google fonts</h5></li>
                </ul>
            </footer>
        </section>
    );
}

export default About
