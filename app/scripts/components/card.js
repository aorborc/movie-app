import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


let numeral = require('numeral');
let backdropIMG;


class Card extends Component {

  constructor() {
    super();
 
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
   openModal(){
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  render() {
    let data = this.props.data
      // if movie ID found, then...
    const customStyles = {
    content : {
      height                : '400px',
      width                 : '1000px',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
  
    }
  };

      let posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster,
          production = data.production,
          productionCountries = data.production_countries,
          genres = data.genre,
          totalRevenue = data.revenue,
          productionList = nestedDataToString(production),
          productionCountriesList = nestedDataToString(productionCountries),
          noData = '-',
          genresList = nestedDataToString(genres);
          backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop;



      // conditional statements for no data
       if (data.vote === 'undefined' || data.vote === 0) {
          data.vote = noData
        } else {
          data.vote = data.vote + ' / 10'
        };

      if (totalRevenue === 'undefined' || totalRevenue === 0) {
           totalRevenue = noData
         } else {
           totalRevenue = numeral(data.revenue).format('($0,0)');
         };

      if (data.budget === 'undefined' || data.budget === 0) {
        data.budget = noData
        } else {
        data.budget = numeral(data.budget).format('($0,0)');
        };

      if(data.poster== null){
        posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
      }

      if(data.cast === 'undefined' ||data.cast === null){
        data.cast = 'no data';
      }

      if(data.crew === 'undefined' ||data.crew === null){
        data.crew = 'no data';
      }

      if(data.vote_count === 'undefined' ||data.vote_count === null){
        data.vote_count = 'no data';
      }

      if(data.status === 'undefined' ||data.status === null){
        data.status = 'no data';
      }

      return (
        <div className="col-xs-12 cardcont nopadding">

          <div className="meta-data-container col-xs-12 col-md-8 push-md-4 col-lg-7 push-lg-5">
            <h1>{data.original_title}</h1>

            <span className="tagline">{data.tagline}</span>
            <p>{data.overview}</p>
            <div className="additional-details">
              <span className="genre-list">{genresList}</span>
              <span className="production-list">{productionList}</span>
              <div className="row nopadding release-details">
                <div className="col-xs-6"> Original Release: <span className="meta-data">{data.release}</span></div>
                <div className="col-xs-6"> Running Time: <span className="meta-data">{data.runtime} mins</span> </div>
                <div className="col-xs-6"> Budget: <span className="meta-data">{data.budget}</span></div>
                <div className="col-xs-6"> Box Office: <span className="meta-data">{totalRevenue}</span></div>
                <div className="col-xs-6"> Vote Average: <span className="meta-data">{data.vote}</span></div>
                <div className="col-xs-6"> Vote Count: <span className="meta-data">{data.vote_count}</span></div>
                <div className="col-xs-6"> Status: <span className="meta-data">{data.status}</span></div>
                <div className="col-xs-6" onClick={this.openModal}> Cast & crew:<span className="meta-data pointer">Click Here</span></div>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal">
                  
                  <h3>Crew</h3>
                  <hr />
                    {data.crew && data.crew.map(function(list, index)
                        {
                          return(
                            <div className="col-xs-12" key={index}>
                              <div className="col-xs-4">
                                <span className="desc">Name:</span>
                                <span className="detail">{list.name}</span>
                                </div>
                              <div className="col-xs-4">
                                <span className="desc">job:</span>
                                <span className="detail">{list.job}</span>
                                </div>
                              <div className="col-xs-4">
                                <span className="desc">gender:</span>
                                <span className="detail">{list.gender === 1 ? 'male' : 'female'}</span>
                              </div>
                            </div>
                            )
                        })}
                  <h3>Cast</h3>
                  <hr />
                    {data.cast && data.cast.map(function(list, index)
                        {
                          return(
                            <div className="col-xs-12" key={index}>
                              <div className="col-xs-4">
                                <span className="desc">Name:</span>
                                <span className="detail">{list.name}</span>
                              </div>
                              <div className="col-xs-4">
                                <span className="desc">character:</span>
                                <span className="detail">{list.character}</span>
                                </div>
                              <div className="col-xs-4">
                                <span className="desc">gender:</span>
                                <span className="detail">{list.gender === 1 ? 'male' : 'female'}</span>
                              </div>
                            </div>
                            )
                    })}
                </Modal>
              </div>
            </div>
          </div>
          <div className="poster-container nopadding col-xs-12 col-md-4 pull-md-8 col-lg-5 pull-lg-7 ">
            <img id="postertest" className='poster' src={posterIMG}/>
          </div>
        </div>
      )
    }
  componentDidUpdate() {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
  }
}


function nestedDataToString(nestedData) {
  let nestedArray = [],
      resultString;
  nestedArray.forEach(function(item, i){
    nestedArray.push(item.name);
  });
  resultString = nestedArray.join(', '); // array to string
  return resultString;
};
module.exports = Card;
