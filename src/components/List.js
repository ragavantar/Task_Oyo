import React, { Component } from 'react';
import {connect} from 'react-redux';

class List extends Component{

constructor(props){
  super(props);
  this.state = {
    hotelslist: []
  }
}

render (){
  console.log('list props', this.props.hotelslist)
  return (
    <div className="listHotels">

        {
          this.props.hotelslist  ?this.props.hotelslist.map((data, i)=>
          <div className="card" key={i}>< a href={`https://www.oyorooms.com/${data.id}?checkin=${this.state.checkin}&checkout=${this.state.checkout}&guests=${this.state.guest}`} target="_blank">
          <img src={data.best_image} alt="Avatar" />
          <div className="container">
            <h4><b>{data.name}</b></h4> 
            {/* <p><b className='price'>{'RS : '+data.pricing[0]}</b><i className='rating'>{' '+data.ratings.value +' '+data.ratings.subtext}</i></p>  */}
          </div></ a>
              </div>
        
          ):null
        } 
        </div>
    );
  }
}

const mapStateToProps = (state)=>{
return {
  hotelslist: state
}
}

export default connect(mapStateToProps, null)(List);


