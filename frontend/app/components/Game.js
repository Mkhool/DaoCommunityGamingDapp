import { useEffect } from 'react';


const Game = () => {
    useEffect(() => {
        const kaboomScript = document.createElement('script');
        kaboomScript.src = 'https://kaboomjs.com/lib/0.5.0/kaboom.js';
        kaboomScript.async = true;




        kaboomScript.onload = () => {
            const gameScript = document.createElement('script');
            gameScript.src= '/game.js'; 
            gameScript.async = true;
            document.body.appendChild(gameScript);
        };

        document.body.appendChild(kaboomScript);

        return () => {
            document.body.removeChild(kaboomScript);
          
        };
    }, []);

    return (
     
        <div
        id="game-container"
        style={{
          width: '100%',
          height: '100%', 
        }}
      >
    
      </div>
     
    );
};

export default Game;