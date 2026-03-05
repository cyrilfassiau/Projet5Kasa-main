import Locations from "./Locations"

export default function Body() {


    return (
      
        <section>
        <div className='box-top'>
        <img className="img-box" src="./assets/bg.png" />
        <div className="box-bg"></div>
        <p className="banner-text">Chez vous, partout et ailleurs</p>
        </div>
        <div className='locations-grid'>
            
            <Locations />
            
           
            </div>
            
        
        </section>

      
    )
  }


    
