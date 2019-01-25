import React, { Component } from 'react';

import {connect} from 'react-redux';

import {updateStateAction} from '../action'
class Form extends Component{

constructor(props){
  super(props);
  this.state = {
    query: '',
    checkin : '',
    checkout: '',
    guest: '',
    dropdown : [],
    hotelslist: [],
    item: {}
  }
}

dropdownData(querytxt){
  this.setState({query: querytxt});

  querytxt = querytxt.replace(/,/g, "");

  fetch("http://ragav.000webhostapp.com/curlfetch.php?query="+encodeURI(querytxt))
  .then(res => res.json())
  .then(data => this.setState({"dropdown":data}, () => console.log(data)))
  .catch(err => console.log(err))
}


search() {
  let {query,checkin,checkout,guest} = this.state;

  let date = new Date(checkin);
  checkin = date.getDate()+'%2F'+(date.getMonth()+1)+'%2F'+date.getFullYear();
  date = new Date(checkout);
  checkout = date.getDate()+'%2F'+(date.getMonth()+1)+'%2F'+date.getFullYear();
  
  this.setState({checkin, checkout});
  
  let location = this.state.dropdown.find(item => item.display_name===query) ;

  let city, lat, lon = '';
  
  if (location.type === 'oyo-hotel'){
    window.open(`https://www.oyorooms.com/${location.id}?checkin=${this.state.checkin}&checkout=${this.state.checkout}&guests=${this.state.guest}`);
    return;
  }
  else if(location.result_type==='city')
   city = location.id.replace(/\D/g,'');
  else if(location.result_type==='locality')
  {
    lat = location.center_point.lat;
    lon = location.center_point.lon;
  }
  
  fetch(`http://ragav.000webhostapp.com/curlfetch.php?city=${city}&in=${checkin}&out=${checkout}&no=${guest}&lat=${lat}&lon=${lon}`)
  .then(res => res.json())
  .then(data => this.setState({"hotelslist":data.hotels}, () => this.props.updateStore(data.hotels)))
  .catch(err => console.log(err))
}

render (){
  return (
      <div className="App">
      <div className="title">
      <h1> OYO </h1>
      <form>
      <input list="query" name="query" onChange={event=> {this.dropdownData(event.target.value)}} placeholder="location"/>
      <input type="date" name="checkin" onChange={event => this.setState({checkin : event.target.value})} placeholder="check in"/>
      <input type="date" name="checkout" onChange={event => this.setState({checkout : event.target.value})} placeholder="check out"/>
      <input type="number" name="guest" onChange={event => this.setState({guest : event.target.value})} placeholder="no of guests"/>
      <input type="button" value="search" onClick={()=>this.search()}/>
        <datalist id="query">
        {
          this.state.dropdown.length>0 ?this.state.dropdown.map((data, i)=>
          <option key={i} data-value={data.id} value={data.display_name}>
            
                {data.display_name}
            
          </option>
          ):null
        }
        </datalist>
      </form>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch =>{
return {
  updateStore : (hotelslist) => dispatch(updateStateAction(hotelslist))
}
}

export default connect(null,mapDispatchToProps)(Form);


