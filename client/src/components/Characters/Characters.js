import React, {Component} from 'react';
import './Characters.css';

class Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {
           characters: [] 
        }
        this.fetchArray = this.fetchArray.bind(this);
    }

    componentDidMount() {
        fetch('/characters')
            .then(res => res.json())
            .then(characters => {
                this.setState({characters});
                this.fetchArray();
            })
            
            
    }   
    
    fetchArray() {
        let data = this.state.characters;

        for(let i = 0; i < data.length; i++) {
            let obj = data[i];

            let season1 = 0;
            let season2 = 0;
            let season3 = 0;

            obj.episode.forEach(element => {
                let stringArray = element.split('/');
                let episodeNumber = stringArray[stringArray.length - 1];
                
                if(episodeNumber <= 11) season1++;
                if(episodeNumber > 11 && episodeNumber <= 21) season2++;
                if(episodeNumber > 21) season3++;
            });
            obj['season1'] = season1;
            obj['season2'] = season2;
            obj['season3'] = season3;
        }
        data.sort((a, b) => {
            let totalA = a.season1 + a.season2 + a.season3;
            let totalB = b.season1 + b.season2 + b.season3;
            if (totalA < totalB) { return 1 }
            if (totalA > totalB) { return -1 }
            if (a.name < b.name) { return -1 }
            if (a.name > b.name) { return 1 }
        })       
        this.setState({ data }); 
    }
    
    render(){
    const { characters } = this.state;
       return (
            <div className="character-list">        
                {characters.filter(element => element.status === 'Alive').map(character => (                    
                    <article key={character.id}>
                        <img src={character.image} alt="images"/>
                        <h1>{character.name}</h1>
                        <p><strong>Visto por último em:</strong> {character.location.name}</p>
                        <p><strong>Gênero: </strong> {(character.gender === 'unknown') ? 'Desconhecido' : ((character.gender === 'Male') ? 'Masculino' : 'Feminino')}</p>
                        <p><strong>Aparições na 1º Temporada: </strong> {character.season1}</p>
                        <p><strong>Aparições na 2º Temporada: </strong>{character.season2}</p>
                        <p><strong>Aparições na 3º Temporada: </strong>{character.season3}</p>
                        <p><strong>Aparições no total: </strong>{character.episode.length} </p>
                        <p><strong>Status: </strong>{(character.status === 'Alive') ? 'Vivo' : 'Morto'}</p>
                    </article>
                ))}       
            </div>
       );
    }
}

export default Characters;