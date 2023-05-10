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
                <h3 className="">This app has been created as a project for the class "Interfaces de Usuario" at Universidad de Málaga.</h3>
            </section>
            <section className="team-section mt-4">
                <div className="team">
                    <h2>Team</h2>
                    <h3>The team is composed by:</h3>
                </div>
                    <ul>
                        <li><span><strong>Pablo Fernández Serrano</strong></span></li>
                        <li><span><strong>Guillermo Tell González</strong></span></li>
                        <li><span><strong>Javier Lanceta Salas (Team Leader)</strong></span></li>
                        <li><span><strong>Javier Leiva Dueñas</strong></span></li>
                    </ul>
            </section>
            <footer className='tech-used'>
                <h2>In this project we used: </h2>
                <ul className='mt-5'>
                    <li><span><strong>React</strong></span></li>
                    <li><span><strong>React Router</strong></span></li>
                    <li><span><strong>React Bootstrap</strong></span></li>
                    <li><span><strong>React Icons</strong></span></li>
                    <li><span><strong>CSS</strong></span></li>
                    <li><span><strong>Google fonts</strong></span></li>
                </ul>
            </footer>
        </section>
    );
}

export default About
